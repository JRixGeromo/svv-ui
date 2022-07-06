import { Component, OnInit } from '@angular/core';
import { metamaskFactory } from '../../services/metamask.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async metamaskLogin(){

    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {

      try {
        // get matemask current address
       await metamaskFactory
        .getMetamaskService()
        .then(async (metamask) => {
          const account = await metamask.getCurrentAccount();
          localStorage.setItem ('account_address', account);
          if(account.length > 0){
            this.router.navigate(['home']).then(()=>{
              window.location.reload();
            });
          }
          else{
            console.log("else")
          }
        })
        .catch((error) => {
          console.log(error);
        });
        // check if the chain to connect to is installed
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await (window as any).ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13881',
                  chainName: 'Mumbai Testnet',
                  rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                  blockExplorerUrls: ['https://polygonscan.com/'],
                  nativeCurrency: {
                    symbol: 'MATIC', // 2-6 characters long
                    decimals: 18
                  },

                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      // alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      window.open("https://metamask.io/download.html", "_blank");
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'md', centered: true  });
  }
}
