import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { Customer } from '@models/customer.model';

describe('RepositoryService', () => {
  let service: RepositoryService<Customer>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
