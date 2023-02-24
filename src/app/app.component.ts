import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCustomers } from './states/customer.actions';
import { CustomerState } from './states/customer.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private store: Store<CustomerState>,
  ){
    this.store.dispatch(loadCustomers())
  }
}
