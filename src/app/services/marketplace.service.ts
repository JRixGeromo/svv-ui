import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { BlockchainService } from './blockchain.service';
import { WalletService } from './wallet.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class MarketplaceService {
  provider: Web3Provider;
  signer: any;
  marketContract: any;
  marketSigner: any;
  abiCoder;
  abi = [
    "function purchase(uint256 tokenId) external payable",
    "function salePrice(uint256 tokenId) external view returns (uint256)",
    "function makeOffer(uint256 tokenId) external payable",
    "function cancelOffer(uint256 tokenId) external",
    "function acceptOffer(uint256 tokenId) external",
    "function tokenBurn(uint256 tokenId) external"
  ];
  marketaddress: string;

  constructor(private bc: BlockchainService, private wallet: WalletService) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = this.provider.getSigner()
    this.wallet.contractAddress().then(res => {
      this.marketaddress = res.marketAddress;
      console.log(this.marketaddress);
      
      this.marketContract = new ethers.Contract(this.marketaddress, this.abi, this.provider);
      this.marketSigner = new ethers.Contract(this.marketaddress, this.abi, this.signer);
    })
    this.abiCoder = ethers.utils.defaultAbiCoder;
  }

  getTokenPrice(tokenId: bigint): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.marketContract.salePrice(tokenId)
        .then((res: any) => {
          const price = ethers.utils.formatEther(res)
          resolve(price);
        })
        .catch((err: Error) => {
          reject(err);
        })
    })
  }

  purchase(tokenId: number) {
    return new Promise<any>((resolve, reject) => {
      this.getTokenPrice(BigInt(tokenId))
        .then((price: any) => {
          this.marketSigner.purchase(tokenId, { value: ethers.utils.parseEther(price.toString()) })
            .then((tx: any) => {
              tx.wait()
                .then((receipt: any) => {
                  this.bc.getTimestamp(receipt.blockNumber)
                    .then((time: any) => {
                      const data = this.abiCoder.decode(["address", "address", "uint256"], receipt.events[6].data);
                      const sold = {
                        hash: receipt.transactionHash,
                        tokenId: tokenId,
                        seller: data[0].toLowerCase(),
                        buyer: data[1].toLowerCase(),
                        price: ethers.utils.formatEther(data[2]),
                        timestamp: time
                      }
                      resolve(sold);
                    })
                    .catch((err: Error) => reject(err))
                })
                .catch((err: Error) => {
                  reject(err);
                })
            })
            .catch((err: Error) => {
              reject(err);
            })
        })
        .catch((err: Error) => {
          reject(err);
        })
    })

  }

  makeOffer(tokenId: number, price: number) {
    return new Promise<any>((resolve, reject) => {
      this.marketSigner.makeOffer(BigInt(tokenId), { value: ethers.utils.parseEther(price.toString()) })
        .then((tx: any) => {
          tx.wait()
            .then((receipt: any) => {
              this.bc.getTimestamp(receipt.blockNumber)
                .then((time: any) => {
                  if (receipt.events.length > 4) {
                    const data = this.abiCoder.decode(["address", "uint256"], receipt.events[3].data);
                    //add tx hash & timestamp
                    const offerMade = {
                      hash: receipt.transactionHash,
                      tokenId: tokenId,
                      buyer: data[0].toLowerCase(),
                      price: ethers.utils.formatEther(data[1]),
                      timestamp: time
                    }
                    resolve(offerMade);
                  }

                  const data = this.abiCoder.decode(["address", "uint256"], receipt.events[2].data);
                  //add tx hash & timestamp
                  const offerMade = {
                    hash: receipt.transactionHash,
                    tokenId: tokenId,
                    buyer: data[0],
                    price: ethers.utils.formatEther(data[1]),
                    timestamp: time
                  }
                  resolve(offerMade);
                })
                .catch((err: Error) => reject(err))
            })
            .catch((err: Error) => {
              reject(err);
            })
        })
        .catch((err: Error) => {
          reject(err);
        })
    })
  }

  acceptOffer(tokenId: number) {
    return new Promise<any>((resolve, reject) => {
      this.marketSigner.acceptOffer(BigInt(tokenId))
        .then((tx: any) => {
          tx.wait()
            .then((receipt: any) => {
              this.bc.getTimestamp(receipt.blockNumber)
                .then((time: any) => {
                  //event[5] is offer accepted, event OfferAccepted(uint256 indexed tokenId, address buyer);
                  //event[6] is sold, event Sold(    uint256 indexed tokenId,    address seller,    address buyer,    uint256 price  );
                  const data = this.abiCoder.decode(["address", "address", "uint256"], receipt.events[6].data);
                  //   //add tx hash & timestamp
                  const offerAccept = {
                    hash: receipt.transactionHash,
                    tokenId: tokenId,
                    seller: data[0].toLowerCase(),
                    buyer: data[1].toLowerCase(),
                    price: ethers.utils.formatEther(data[2]),
                    timestamp: time
                  }
                  resolve(offerAccept);
                })
                .catch((err: Error) => reject(err))
            })
            .catch((err: Error) => {
              reject(err);
            })
        })
        .catch((err: Error) => {
          reject(err);
        })
    })
  }

  cancelOffer(tokenId: number) {
    return new Promise<any>((resolve, reject) => {
      this.marketSigner.cancelOffer(BigInt(tokenId))
        .then((tx: any) => {
          tx.wait()
            .then((receipt: any) => {
              this.bc.getTimestamp(receipt.blockNumber)
                .then((time: any) => {
                  const data = this.abiCoder.decode(["address"], receipt.events[1].data);
                  const offerCancel = {
                    hash: receipt.transactionHash,
                    tokenId: tokenId,
                    buyer: data[0].toLowerCase(),
                    timestamp: time
                  }
                  resolve(offerCancel);
                })
                .catch((err: Error) => reject(err))
            })
            .catch((err: Error) => {
              reject(err);
            })
        })
        .catch((err: Error) => {
          reject(err);
        })
    })
  }
}
