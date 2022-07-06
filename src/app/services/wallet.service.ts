import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { environment } from 'src/environments/environment';
declare let window: any;
@Injectable({
  providedIn: 'root',
})
export class WalletService {
  ethereum;
  chainID;
  currentAccount = null;
  public nftAddress;
  public marketAddress;

  constructor() {
    this.ethereum = window.ethereum;
    this.getChainID();
    this.ethereum.on('chainChanged', (res: any) =>
      this.handleChainChanged(res)
    );
    this.ethereum.on('accountsChanged', (res: any) =>
      this.handleAccountsChanged(res)
    );
  }

  /*****************************************/
  /* Detect the MetaMask Ethereum provider */
  /*****************************************/

  async detectProvider(): Promise<any> {
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();

    if (provider) {
      return 'provider exist';
    } else {
      console.log('Please install MetaMask!');
      return 'Please install MetaMask!';
    }
  }

  async getChainID() {
    try {
      const chainId = await this.ethereum.request({ method: 'eth_chainId' });
      if (chainId == '0x13881') {
        console.log('ha mumbai');
        this.nftAddress = environment.mumbai.NFT_ADDRESS_M;
        this.marketAddress = environment.mumbai.MARKETPLACE_ADDRESS_M;
      } else if (chainId == '0x4') {
        console.log('rinkeby');
        this.nftAddress = environment.rinkeby.NFT_ADDRESS_R;
        this.marketAddress = environment.rinkeby.MARKETPLACE_ADDRESS_R;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async contractAddress() {
    const chainId = await this.ethereum.request({ method: 'eth_chainId' });
    if (chainId == '0x13881') {
      console.log('ha mumbai');
      return {
        nftAddress: environment.mumbai.NFT_ADDRESS_M,
        marketAddress: environment.mumbai.MARKETPLACE_ADDRESS_M,
      };
    } else if (chainId == '0x4') {
      console.log('rinkeby');
      return {
        nftAddress: environment.rinkeby.NFT_ADDRESS_R,
        marketAddress: environment.rinkeby.MARKETPLACE_ADDRESS_R,
      };
    }
  }

  /**********************************************************/
  /* Handle chain (network) and chainChanged (per EIP-1193) */
  /**********************************************************/

  handleChainChanged(chainId) {
    console.log('Chain tukar ke: ' + chainId);
    if (chainId == '0x13881') {
      console.log('ha mumbai');
      this.nftAddress = '0xaaB2c280ac9CB9B8a38501824be31f073c34541d';
      this.marketAddress = '0xB754901e73E0667Ea289fEBB76e5dD0219213614';
    } else if (chainId == '0x4') {
      console.log('rinkeby');
      this.nftAddress = '0xe072E7A3925779c9D0be160738C401d832Ca5373';
      this.marketAddress = '0x48D9717f8bcE6ECB9F0AD1616c8e14036B2b5664';
    }
  }

  // this.ethereum.on('chainChanged', handleChainChanged);

  // handleChainChanged(_chainId) {
  //   // We recommend reloading the page, unless you must do otherwise
  //   window.location.reload();
  // }

  /***********************************************************/
  /* Handle user accounts and accountsChanged (per EIP-1193) */
  /***********************************************************/

  // let currentAccount = null;
  async getAccount() {
    const accounts = await this.ethereum.request({
      method: 'eth_requestAccounts',
    });
    if (accounts) {
      const account = accounts[0];
      this.handleAccountsChanged(accounts);
      return account;
    } else {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error([]);
    }
    // // Note that this event is emitted on page load.
    // // If the array of accounts is non-empty, you're already
    // // connected.
  }

  // ethereum.on('accountsChanged', handleAccountsChanged);

  // // For now, 'eth_accounts' will continue to always return an array
  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== this.currentAccount) {
      this.currentAccount = accounts[0];
      console.log(this.currentAccount);
      // window.location.reload();
      // return this.currentAccount;
      // Do any other work!
    }
  }

  // /*********************************************/
  // /* Access the user's accounts (per EIP-1102) */
  // /*********************************************/

  // // You should only attempt to request the user's accounts in response to user
  // // interaction, such as a button click.
  // // Otherwise, you popup-spam the user like it's 1999.
  // // If you fail to retrieve the user's account(s), you should encourage the user
  // // to initiate the attempt.
  // document.getElementById('connectButton', connect);

  // // While you are awaiting the call to eth_requestAccounts, you should disable
  // // any buttons the user can click to initiate the request.
  // // MetaMask will reject any additional requests while the first is still
  // // pending.
  // function connect() {
  //   ethereum
  //     .request({ method: 'eth_requestAccounts' })
  //     .then(handleAccountsChanged)
  //     .catch((err) => {
  //       if (err.code === 4001) {
  //         // EIP-1193 userRejectedRequest error
  //         // If this happens, the user rejected the connection request.
  //         console.log('Please connect to MetaMask.');
  //       } else {
  //         console.error(err);
  //       }
  //     });
  // }
}
