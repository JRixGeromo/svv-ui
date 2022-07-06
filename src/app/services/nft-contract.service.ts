import { Injectable } from '@angular/core';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, Contract, ethers } from 'ethers';
import { BlockchainService } from './blockchain.service';
import { WalletService } from './wallet.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class NftContractService {

  provider: Web3Provider;
  signer: any;
  nftContract: any;
  nftSigner: any;
  abiCoder;
  abi = [
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function name() public view virtual override returns (string memory)",
    "function safeMint(string memory ipfsCID, uint32 royalty)",
    "function approveMarket(uint256 tokenId, uint256 price)",
    "function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address receiver, uint256 royaltyAmount)",
    "function burn(uint256 tokenId) public override",
    "function balanceOf(address owner) external view returns (uint256 balance)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId)"
  ];
  nftaddress: string;

  constructor(private bc: BlockchainService, private wallet: WalletService) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.signer = this.provider.getSigner()
    console.log("nft service: ", this.nftaddress);
    this.wallet.contractAddress().then(res => {
      this.nftaddress = res.nftAddress;
      console.log(this.nftaddress);
      
      this.nftContract = new ethers.Contract(this.nftaddress, this.abi, this.provider);
      this.nftSigner = new ethers.Contract(this.nftaddress, this.abi, this.signer);
    })

    this.abiCoder = ethers.utils.defaultAbiCoder;
    const obj = this.wallet.contractAddress();
    console.log(obj);



  }

  getTokenURI(tokenId: bigint): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.nftContract.tokenURI(BigInt(tokenId))
        .then((res: any) => {
          //resolve token URI based on tokenId
          resolve(res);
        })
        .catch((err: Error) => reject(err));
    })
  }

  royaltyInfo(tokenId: bigint, salePrice: bigint): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.nftContract.royaltyInfo(tokenId, salePrice)
        .then(res => {
          console.log("royaltyinfo: " + res);
          resolve(res)
        })
    })
  }

  mintToken(ipfsCID: string, royalty: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nftSigner.safeMint(ipfsCID, royalty)
        .then((tx: any) => {
          tx.wait()
            .then((receipt: any) => {
              console.log(receipt);
              this.bc.getTimestamp(receipt.blockNumber)
                .then((time: any) => {
                  //decode topics from event to get owner & minted tokenID
                  const owner = this.abiCoder.decode(["address"], receipt.events[0].topics[2])[0];
                  const tokenId = this.abiCoder.decode(["uint256"], receipt.events[0].topics[3])[0].toNumber();
                  const data = {
                    hash: receipt.transactionHash,
                    owner: owner.toLowerCase(),
                    tokenId: tokenId,
                    timestamp: time
                  }
                  //use this data object to update hash & tokenId to the nft API
                  resolve(data);
                })
                .catch((err: Error) => reject(err))
            })
            .catch((err: Error) => reject(err));
        }).catch((err: Error) => reject(err));
    })
  }

  listMarket(tokenId: bigint, price: number): Promise<any> {
    //convert ether to wei
    const wei = ethers.utils.parseEther(price.toString());
    return new Promise<any>((resolve, reject) => {
      // const ether = price * 10 ** 18;
      console.log("in wei: ", wei.toBigInt());
      this.nftSigner.approveMarket(tokenId, wei.toBigInt())
        .then((tx: any) => {
          tx.wait()
            .then((receipt: any) => {
              this.bc.getTimestamp(receipt.blockNumber)
                .then((time: any) => {
                  //event PriceUpdated(uint256 indexed tokenId, address seller, uint256 price);
                  const data = this.abiCoder.decode(["address", "uint256"], receipt.events[1].data);
                  const priceUpdate = {
                    hash: receipt.transactionHash,
                    tokenId: tokenId,
                    seller: data[0],
                    price: ethers.utils.formatEther(data[1]),
                    receipt: receipt,
                    timestamp: time
                  }
                  resolve(priceUpdate);
                })
                .catch((err: Error) => reject(err))
            })
            .catch((err: Error) => reject(err));
        })
        .catch((err: Error) => {
          reject(err);
        })
    })
  }

  burnToken(tokenId: bigint): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.nftSigner.burn(tokenId)
        .then((tx: any) => {
          tx.wait()
            .then((receipt: any) => {
              this.bc.getTimestamp(receipt.blockNumber)
                .then((time: any) => {
                  if (receipt.events.length > 3) {
                    //event OfferCanceled(uint256 indexed tokenId, address buyer);
                    const buyer = this.abiCoder.decode(["address"], receipt.events[2].data);
                    const owner = this.abiCoder.decode(["address"], receipt.events[0].topics[1]);
                    const to = this.abiCoder.decode(["address"], receipt.events[0].topics[2]);
                    const data = {
                      hash: receipt.transactionHash,
                      owner: owner[0],
                      to: to[0],
                      tokenId: tokenId,
                      timestamp: time,
                      state: ["clear approval", "burn"],
                      offerCancel: {
                        buyer: buyer
                      },
                      receipt: receipt
                    }
                    resolve(data);
                  }
                  const owner = this.abiCoder.decode(["address"], receipt.events[0].topics[1]);
                  const to = this.abiCoder.decode(["address"], receipt.events[0].topics[2]);
                  const data = {
                    hash: receipt.transactionHash,
                    owner: owner[0],
                    to: to[0],
                    tokenId: tokenId,
                    timestamp: time,
                    state: ["clear approval", "burn"],
                    receipt: receipt
                  }
                  resolve(data);
                })
                .catch((err: Error) => reject(err))
            })
            .catch((err: any) => {
              reject(err);
            })
        })
        .catch((err: any) => {
          reject(err);
        })
    })
  }

  getName(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.nftContract.name().then((res: any) => {
        //resolve NFT Token name
        resolve(res);
      }).catch((err: Error) => reject(err));
    })
  }

  async balanceOf(owner: string) {
    try {
      const balance: BigNumber = this.nftContract.balanceOf(owner);
      console.log("Balance: ", balance);
      return balance;
    } catch (error: any) {
      console.error(error.message);
      return error.message;
    }
  }

  async tokenOfOwnerByIndex(owner: string, index: number) {
    try {
      const id = this.nftContract.tokenOfOwnerByIndex(owner, index);
      console.log(id);
      return id;
    } catch (error) {
      return error.message;
    }
  }
}
