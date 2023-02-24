import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Injectable, PipeTransform } from '@angular/core';
import { CustomerService } from '@services/customer/customer.service';
import { Customer } from '@models/customer.model';
import { SortColumn, SortDirection } from '../../directives/sortable/sortable.directive';

interface SearchResult {
  customers: Array<Customer>;
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(customers: Array<Customer>, column: SortColumn, direction: string): Array<Customer> {
  if (direction === '' || column === '') {
    return customers;
  } else {
    return [...customers].sort((a, b) => {
      const res = compare(a[column]!, b[column]!);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(customer: Customer, term: string, pipe: PipeTransform) {
  return (
    customer.firstName.toLowerCase().includes(term.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(term.toLowerCase()) ||
    customer.status.toLowerCase().includes(term.toLowerCase())
  );
}

const initialState: State = {
  page: 1,
  pageSize: 4,
  searchTerm: '',
  sortColumn: '',
  sortDirection: '',
}

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _customers$ = new BehaviorSubject<Customer[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = initialState;

  constructor(
    private pipe: DecimalPipe,
    private customerService: CustomerService,
  ) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result: any) => {
        this._customers$.next(result.customers);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get customers$() {
    return this._customers$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public reset() {
    Object.assign(this._state, initialState);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let customers = sort(this.customerService.findAll(), sortColumn, sortDirection);

    // 2. filter
    customers = customers.filter((customer) => matches(customer, searchTerm, this.pipe));
    const total = customers.length;

    // 3. paginate
    customers = customers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ customers, total });
  }
}
