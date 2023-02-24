import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { loadCustomers, loadCustomersSuccess, removeCustomer, removeCustomerAction, removeCustomerFinishedAction, removeCustomerSuccess, saveCustomerAction, saveCustomerFinishedAction, saveCustomerModalAction, searchBarSearchAction, searchBarSearchActionFinished, sortColumnAction, sortColumnFinishedAction } from './customer.actions';
import { CustomerService } from '@services/customer/customer.service';

@Injectable()
export class CustomerEffects {
  constructor (
    private actions$: Actions,
    private customerService: CustomerService,
  ) {
  }

  loadCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(loadCustomers),
    mergeMap(
      () => of(this.customerService.findAll())
        .pipe(
          map(data => loadCustomersSuccess({customers: data}))
        )
      )
    )
  );

  filterCustomerSearchTerm$ = createEffect(() => this.actions$.pipe(
    ofType(searchBarSearchAction),
    mergeMap(
      ({ searchTerm }) => of(this.customerService.filterBySearchTerm(searchTerm))
        .pipe(
          map(data => searchBarSearchActionFinished({payload: {searchTerm: searchTerm, customers: data}}))
        )
        ),
      ),
  );

  sortTable$ = createEffect(() => this.actions$.pipe(
    ofType(sortColumnAction),
    mergeMap(
      ({ options }) => of(this.customerService.sortByColumn(options.sortColumn, options.sortDirection))
        .pipe(
          map(data => sortColumnFinishedAction({ 
            payload: {
              customers: data,
              options: {
                sortColumn: options.sortColumn,
                sortDirection: options.sortDirection
              }
            }
          }))
        )
    ),
  ));

  removeCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(removeCustomerAction),
    mergeMap(
      ({customerId}) => of(this.customerService.remove(customerId))
    ),
    mergeMap(
      (_) => of(this.customerService.findAll())
        .pipe(
          map(data => removeCustomerFinishedAction({customers: data}))
        )
    )
  ));

  saveCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(saveCustomerAction),
    mergeMap(
      ({customer, status}) => of(this.customerService.setStatusAndSave(customer, status))
    ),
    mergeMap(
      (_) => of(this.customerService.findAll())
        .pipe(
          map(data => saveCustomerFinishedAction({customers: data}))
        )
    )
  ));

  saveCustomerFromModal$ = createEffect(() => this.actions$.pipe(
    ofType(saveCustomerModalAction),
    mergeMap(
      ({customer}) => of(this.customerService.save(customer))
    ),
    mergeMap(
      (_) => of(this.customerService.findAll())
        .pipe(
          map(data => saveCustomerFinishedAction({customers: data}))
        )
    )
  ));
}