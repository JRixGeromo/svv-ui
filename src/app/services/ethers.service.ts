import { ethers, Contract } from 'ethers';
import { environment } from 'src/environments/environment';
import { NftMetadata } from '../models/nftMetadata';
import { NftToken } from '../models/nftToken';

export class EthersService {
  /// ethers.js NFT contract object
  private nftContract: Contract;

  constructor() {
    // EthersService only used for displaying NFT (currently)
    const etherProvider = new ethers.providers.JsonRpcProvider(
      environment.rinkeby_rpcURL
    );
    // Note: getSigner() should accept active metamask's address. But NFT_ADDRESS still works
    // if only for getting all NFTs
    const signer = etherProvider.getSigner(environment.NFT_ADDRESS);
    this.nftContract = new ethers.Contract(
      environment.NFT_ADDRESS,
      environment.NFT_ABI,
      signer
    );
  }

  /**
   * Returns specified token's metadata URI
   *
   * @param id NFT token's id
   * @returns NFT token's metadata URI
   */
  getTokenUri(id: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenURI = await this.nftContract.tokenURI(id);
        resolve(tokenURI);
      } catch (error) {
        reject(error);
      }
    });
  }

  getTokenOwner(id: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenAddress = await this.nftContract.ownerOf(id);
        resolve(tokenAddress);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get specified token's metadata json
   *
   * @param id NFT token's id
   * @returns Metadata json
   */
  getMetadata(id: number): Promise<NftMetadata> {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenURI: string = await this.nftContract.tokenURI(id);
        const format = tokenURI.substr(tokenURI.length - 4, tokenURI.length);
        if (format === 'json') {
          fetch(tokenURI)
            .then((res) => res.json())
            .then((res: NftMetadata) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get every token's metadata json
   *
   * @remarks
   * Only gets metadata json of valid metadataUri
   *
   * @returns Array of valid Metadata json
   */
  getAllMetadata(): Promise<Array<NftMetadata>> {
    return new Promise(async (resolve, reject) => {
      try {
        const array = Array<NftMetadata>();
        const size = await this.getTotalTokens();
        // Current NFT test token valid tokens only start at 48th onwards
        // TODO: refactor to 1 when swap to a new NFT contract
        for (var i = 48; i < size; i++) {
          try {
            const token = await this.getMetadata(i);
            if (typeof token.name != 'undefined') {
              array.push(token);
            }
          } catch (error) {
            // Continue to get next token's metadata
          }
        }
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get every tokens' data by getting token's metadata and owner addressv
   *
   * @returns Array of NFTToken objects
   */
  getAllTokens(): Promise<Array<NftToken>> {
    return new Promise(async (resolve, reject) => {
      try {
        const array = Array<NftToken>();
        const size = await this.getTotalTokens();
        // Current NFT test token valid tokens only start at 48th onwards
        // TODO: refactor to 1 when swap to a new NFT contract
        for (var i = 48; i < size; i++) {
          try {
            const token = await this.getMetadata(i);
            if (typeof token.name != 'undefined') {
              const owner = await this.getTokenOwner(i);
              const nftToken = new NftToken(token, owner, 'issuerPlaceholder');
              array.push(nftToken);
            }
          } catch (error) {
            // Continue to get next token's metadata
          }
        }
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get every NFT owned by given address
   *
   * @param address user address
   * @returns Array of nftToken objects owned by given address
   */
  getUserAllTokens(address: string): Promise<Array<NftToken>> {
    return new Promise(async (resolve, reject) => {
      try {
        const array = Array<NftToken>();
        const size = await this.getTotalTokens();
        // Current NFT test token valid tokens only start at 48th onwards
        // TODO: refactor to 1 when swap to a new NFT contract
        for (var i = 48; i < size; i++) {
          try {
            const owner = await this.getTokenOwner(i);
            if (owner === address) {
              const token = await this.getMetadata(i);
              if (typeof token.name != 'undefined') {
                const owner = await this.getTokenOwner(i);
                const nftToken = new NftToken(
                  token,
                  owner,
                  'issuerPlaceholder'
                );
                array.push(nftToken);
              }
            }
          } catch (error) {
            // Continue to get next token's metadata
          }
        }
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Return number of total minted tokens
   *
   * @returns total minted tokens
   */
  getTotalTokens(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const supply = await this.nftContract.totalSupply();
        resolve(supply.toNumber());
      } catch (error) {
        reject(error);
      }
    });
  }
}
