import detectEthereumProvider from '@metamask/detect-provider';

// Todo: Requesting for metamask should be a button, and not actively asking users for metmask
/**
 * Factory method for accessing Metamask Service
 */
export const metamaskFactory = {
  /**
   * Metamask 'eth_requestAccounts' notes
   *
   * Requests that the user provides an Ethereum address to be identified by.
   * Returns a Promise that resolves to an array of a single Ethereum address
   * string. If the user denies the request, the Promise will reject with a 4001
   *  error.
   *
   * The request causes a MetaMask popup to appear. You should only request the
   * user's accounts in response to user action, such as a button click. You
   * should always disable the button that caused the request to be dispatched,
   * while the request is still pending.
   *
   * If you can't retrieve the user's account(s), you should encourage the user
   * to initiate an account request
   *
   * @returns Metamask Service
   */
  async getMetamaskService(): Promise<MetamaskService> {
    const provider = await detectEthereumProvider();
    if (provider) {
      var metamaskProvider = provider as any;
      try {
        await metamaskProvider.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // TODO: Prompt Please connect to Metamask message
          console.log('Please connect to MetaMask.');
        } else {
          console.error(error);
        }
      }
      const service = new MetamaskService(metamaskProvider);
      return service;
    } else {
      console.log('no provider');
      // throw error
    }
  },
};

// Guide: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
class MetamaskService {
  /// Metamask provider object
  private metamaskProvider: any;

  /// Current active Metamask ETH Address
  currentAccount: string;

  /// Current active Metmask chain ID
  currentChainId: string;

  constructor(ethProvider) {
    this.metamaskProvider = ethProvider;
    this.currentAccount = '';

    // Handle user accounts and accountsChanged
    const accountRequest: Promise<unknown> = this.metamaskProvider.request({
      method: 'eth_accounts',
    });
    accountRequest.then((res) => {
      this.handleAccountsChanged(res);
      this.metamaskProvider.on('accountsChanged', this.handleAccountsChanged);
    });

    // Handle chain (network) and chainChanged
    const chainRequest: Promise<unknown> = ethProvider.request({
      method: 'eth_chainId',
    });
    chainRequest.then((res) => {
      this.handleChainChanged(res);
      this.metamaskProvider.on('chainChanged', this.handleChainChanged);
    });
  }

  /**
   * Updates this.currentChainId if user switches chain in Metamask
   *
   * @param _chainId Current metamask chain ID
   */
  private handleChainChanged(_chainId) {
    //console.log('handleChainChanged');
    this.currentChainId = _chainId;
    //console.log(_chainId);
  }

  /**
   * Updates this.currentAccount if user switches account in Metamask
   *
   * @param accounts Current metamask accounts
   */
  private handleAccountsChanged(accounts) {
    console.log('handleAccountsChanged');
    if (accounts[0] !== this.currentAccount) {
      this.currentAccount = accounts[0];
      console.log('Account changed to ' + this.currentAccount);
      localStorage.setItem('account_address',this.currentAccount);
      // Do any other work!
    }
  }

  /**
   * Returns the current Ethereum address active on Metamask
   *
   * @returns ethereum address
   */
  getCurrentAccount(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const accounts: Promise<String[]> = await this.metamaskProvider.request(
          {
            method: 'eth_accounts',
          }
        );
        resolve(accounts[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
}
