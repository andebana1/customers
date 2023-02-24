import { createAction, props } from '@ngrx/store';
import { SortColumn } from '../shared/directives/sortable/sortable.directive';
import { Customer } from '@models/customer.model';

export interface SearchTermResult {
  customers: Array<Customer>,
  searchTerm: string,
}

export interface SortOptions {
  sortColumn: SortColumn,
  sortDirection: string
}

export interface SortColumnResult {
  customers: Array<Customer>,
  options: SortOptions
}

export const loadCustomers = createAction('[Customer List] Load Items');
export const loadCustomersSuccess = createAction('[Customer List] Load Items Success', props<{ customers: Array<Customer> }>());
export const removeCustomer = createAction('[Customer List] Remove Item', props<{ customerId: string }>());
export const removeCustomerSuccess = createAction('[Customer List] Remove Item Success', props<{ customers: Array<Customer> }>());

export const searchBarSearchAction = createAction('[Customer List] Use Search Bar', props<{ searchTerm: string }>());
export const searchBarSearchActionFinished = createAction('[Customer List] Use Search Bar Finisehd', props<{ payload: SearchTermResult }>());


export const sortColumnAction = createAction('[Customer List] Sorting By Colum', props<{ options: SortOptions }>());
export const sortColumnFinishedAction = createAction('[Customer List] Sorting By Colum Finished', props<{ payload: SortColumnResult }>());

export const removeCustomerAction = createAction('[Customer List] Remove Customer', props<{customerId: string}>());
export const removeCustomerFinishedAction = createAction('[Customer List] Remove Customer Finished', props<{ customers: Array<Customer> }>());

export const saveCustomerAction = createAction('[Customer List] Save Customer', props<{customer: Customer, status: string}>());
export const saveCustomerModalAction = createAction('[Modal Save Customer] Save Customer', props<{customer: Customer}>());
export const saveCustomerFinishedAction = createAction('[Customer List] Save Customer Finished', props<{ customers: Array<Customer> }>());
