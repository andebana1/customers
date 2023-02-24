import { Component } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { loadCustomers, searchBarSearchAction } from './states/customer.actions';
import { CustomerState } from './states/customer.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public test$: any = this.store.select(selectMyList);;
  constructor(
    private store: Store<CustomerState>,
    ){
      this.store.dispatch(loadCustomers())
  }
}
