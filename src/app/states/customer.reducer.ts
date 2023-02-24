import { createReducer, on } from '@ngrx/store';
import { loadCustomers, loadCustomersSuccess, removeCustomerFinishedAction, saveCustomerFinishedAction, searchBarSearchActionFinished, sortColumnFinishedAction } from './customer.actions';
import { SortColumn, SortDirection } from '../shared/directives/sortable/sortable.directive';

export interface CustomerState {
  customerList: Array<any>,
}

export const initialState: CustomerState = {
  customerList: [],
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: string;
}

const initialTableState: State = {
  page: 1,
  pageSize: 4,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
}

export const customerReducer = createReducer(
  {
    ...initialState,
    ...initialTableState
  },
  on(loadCustomersSuccess, (state, { customers }) => ({ ...state, customerList: customers })),
  on(removeCustomerFinishedAction, (state, { customers }) => ({ ...state, customerList: customers })),
  on(saveCustomerFinishedAction, (state, { customers }) => ({ ...state, customerList: customers })),
  on(searchBarSearchActionFinished, (state, { payload }) => ({...state, customerList: payload.customers, searchTerm: payload.searchTerm})),
  on(sortColumnFinishedAction, (state, { payload }) => ({
    ...state,
    customerList: payload.customers,
    sortColumn: payload.options.sortColumn,
    sortDirection: payload.options.sortDirection
  })),
);
