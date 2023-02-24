import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Customer, StatusEnum } from '@models/customer.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { set } from 'lodash';
import { CustomerService } from '@services/customer/customer.service';
import { SortOptions, removeCustomerAction, saveCustomerAction, searchBarSearchAction, sortColumnAction, sortColumnFinishedAction } from '@states/customer.actions';
import { Observable } from 'rxjs';
import { NgbdSortableHeaderDirective, SortColumn, SortEvent } from 'src/app/shared/directives/sortable/sortable.directive';
import { selecCustomerList, selectSearchTerm } from 'src/app/states/customer.selector';
import { SaveCustomerModalComponent } from './save-customer-modal/save-customer-modal.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  public customerStatus = StatusEnum;
  customers$: Observable<Array<Customer>> = this.store.select(selecCustomerList);
  searchTerm$: Observable<string> = this.store.select(selectSearchTerm);
  @ViewChildren(NgbdSortableHeaderDirective) headers!: QueryList<NgbdSortableHeaderDirective>;

  constructor(
    private store: Store,
    private customerService: CustomerService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
  }

  removeItem(id: string) {
    this.store.dispatch(removeCustomerAction({customerId: id}))
  }

  changeStatus(status: string, customer: Customer) {
    this.store.dispatch(saveCustomerAction({customer: customer, status: status}));
  }

  public openSaveCustomerModal(id: string | null = null): void {
    const modalRef = this.modalService.open(SaveCustomerModalComponent);
    modalRef.componentInstance.customerId = id;
  }

  public searchCustomers(event: any) {
    this.store.dispatch(searchBarSearchAction({searchTerm: event.target.value}));
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    const options: SortOptions = {
      sortColumn: column,
      sortDirection: direction,
    }

    this.store.dispatch(sortColumnAction({options}));
  }
}
