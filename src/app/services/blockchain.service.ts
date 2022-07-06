import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  provider: Web3Provider;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
   }

  //get block timestamp by block number
  getTimestamp(block: number){
    return new Promise<any>((resolve, reject) => {
      this.provider.getBlock(block)
        .then((res:any)=>{
          resolve(res.timestamp);
        })
        .catch((err: Error)=>{
          reject(err);
        })
    })
  }
}
