import { Injectable } from '@angular/core';
import { set } from 'lodash';
import { Customer } from '@models/customer.model';
import customerSeed from '@models/customer.seed';
import { RepositoryService } from '@services/repository/repository.service';
import { StorageService } from '@services/storage/storage.service';
import { Observable } from 'rxjs';
import { SortColumn } from 'src/app/shared/directives/sortable/sortable.directive';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends RepositoryService<Customer> {
  protected override modelStorageLabel = 'customer';
  protected override isSeededLabel = 'isCustomerSeeded';

  constructor(
    protected override storageService: StorageService
  ) {
    super(storageService);
    this.insertSeeds();
  }

  public override insertSeeds(): void {
    if (this.needSeed()) {
      const seeds = customerSeed();
      this.storageService.saveItem({
        items: [
          { key: this.modelStorageLabel, value: seeds },
          { key: this.isSeededLabel, value: true },
        ]
      });
    }
  }

  private matches(customer: Customer, term: string) {
    if (!term) return false;
    return (
      customer.firstName.toLowerCase().includes(term.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(term.toLowerCase()) ||
      customer.status.toLowerCase().includes(term.toLowerCase())
    );
  }

  public filterBySearchTerm(search: string): Array<Customer> {
    if (!search) return this.findAll();
    return this.findAll().filter(customer => this.matches(customer, search));
  }

  private compare = (v1: string, v2: string) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

  private sort(customers: Array<Customer>, column: SortColumn, direction: string): Array<Customer> {
    if (direction === '' || column === '') {
      return customers;
    } else {
      return [...customers].sort((a, b) => {
        const res = this.compare(a[column]!, b[column]!);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  public sortByColumn(column: SortColumn, direction: string): Array<Customer> {
    return this.sort(this.findAll(), column, direction);
  }

  public setStatusAndSave(customer: Customer, status: string): void {
    const changerCustomer = this.findOneById(customer.id);
    set(changerCustomer!, 'status', status);
    this.save(changerCustomer!);
  }

}
