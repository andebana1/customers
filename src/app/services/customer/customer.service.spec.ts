import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import customerSeed from '@models/customer.seed';
import { StorageService } from '@services/storage/storage.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
      ]
    });
    service = TestBed.inject(CustomerService);
  });

  it('seeds should be inserted', () => {
    service.insertSeeds();
    const data = service.findAll();
    expect(data.length).toEqual(customerSeed().length);
  });

  it('must be removed', () => {
    service.insertSeeds();
    const toRemove = customerSeed()[0].id;
    service.remove(toRemove);
    const exist = service.findAll().some(item => item.id === toRemove);
    expect(exist).toBeFalse();
  });
});
