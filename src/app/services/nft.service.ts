import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NftService {
  constructor(private http: HttpClient) {}

  httpOption = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }),
  };

  getAllnft(): Observable<any> {
    return this.http.get(
      'https://svv.svr-stg.xyz/api/v1/nft/all',
      this.httpOption
    );
  }

  getNftById(id: number): Observable<any> {
    const body = {
      _id: id,
    };

    return this.http.post(
      'https://svv.svr-stg.xyz/api/v1/nft/byid',
      body,
      this.httpOption
    );
  }

  getNftByUserId(body): Observable<any> {
    return this.http.post(
      'https://svv.svr-stg.xyz/api/v1/nft/byuid',
      body,
      this.httpOption
    );
  }

  updateViewerById(data): Observable<any> {
    return this.http.patch(
      'https://svv.svr-stg.xyz/api/v1/nft/viewer',
      data,
      this.httpOption
    );
  }

  updateFavouriteById(data): Observable<any> {
    return this.http.patch(
      'https://svv.svr-stg.xyz/api/v1/nft/favourite',
      data,
      this.httpOption
    );
  }

  createNft(data): Observable<any> {
    console.log('000', data);
    return this.http.post(
      'https://svv.svr-stg.xyz/api/v1/nft/create',
      data,
      this.httpOption
    );
  }

  findNft(data): Observable<any> {
    return this.http.post(
      'https://svv.svr-stg.xyz/api/v1/nft/find',
      { param: data },
      this.httpOption
    );
  }

  updateNftBycid(data): Observable<any> {
    return this.http.patch(
      'https://svv.svr-stg.xyz/api/v1/nft/updateBycid',
      data,
      this.httpOption
    );
  }

  deleteNftBycid(data): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
      body: {
        cid: data,
      },
    };
    return this.http.delete(
      'https://svv.svr-stg.xyz/api/v1/nft/deleteBycid',
      httpOption
    );
  }

  listToMarket(data): Observable<any> {
    return this.http.patch(
      'https://svv.svr-stg.xyz/api/v1/nft/list-to-market',
      data,
      this.httpOption
    );
  }

  tradingHIstoryByTokenId(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/trading/history',
      data,
      this.httpOption
    );
  }

  directPurchase(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/trading/direct-purchase',
      data,
      this.httpOption
    );
  }

  listToAuction(data): Observable<any> {
    return this.http.patch(
      'https://svv.svr-stg.xyz/api/v1/nft/list-to-auction',
      data,
      this.httpOption
    );
  }

  makeOffer(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/offer/make',
      data,
      this.httpOption
    );
  }

  getCurrentOffer(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/offer/current',
      data,
      this.httpOption
    );
  }

  getOfferHistory(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/offer/history',
      data,
      this.httpOption
    );
  }

  getOfferMade(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/offer/made',
      data,
      this.httpOption
    );
  }

  getOfferReceived(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/offer/received',
      data,
      this.httpOption
    );
  }

  cancelOffer(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/offer/cancel',
      data,
      this.httpOption
    );
  }

  acceptOffer(data): Observable<any> {
    return this.http.post(
      'https://nftapi.wowoonet.com/trading/offer-purchase',
      data,
      this.httpOption
    );
  }
}
