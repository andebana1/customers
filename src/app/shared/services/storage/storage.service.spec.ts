import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import customerSeed from '@models/customer.seed';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
      ]
    });
    service = TestBed.inject(StorageService);
  });

  
  it('should clear de whole list', () => {
    service.saveItem({ key: 'costumer', data: customerSeed()});
    service.removeItem('customer');
    expect(service.getItem('customer')).toBeNull();
  });

  it('should have the same size from the seeds', () => {
    service.saveItem({ key: 'customer', data: customerSeed()});
    expect(service.getItem('customer').length).toEqual(customerSeed().length);
  });
});
