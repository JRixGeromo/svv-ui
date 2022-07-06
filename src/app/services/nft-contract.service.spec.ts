import { TestBed } from '@angular/core/testing';

import { NftContractService } from './nft-contract.service';

describe('NftContractService', () => {
  let service: NftContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
