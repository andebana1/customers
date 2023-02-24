import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCustomer = createFeatureSelector<any>('customers');

export const selecCustomerList = createSelector(
  selectCustomer,
  (state) => state.customerList
);

export const selectSearchTerm = createSelector(
  selectCustomer,
  (state) => state.searchTerm
);
