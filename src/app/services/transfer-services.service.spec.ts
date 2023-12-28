import { TestBed } from '@angular/core/testing';

import { TransferServicesService } from './transfer-services.service';

describe('TransferServicesService', () => {
  let service: TransferServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
