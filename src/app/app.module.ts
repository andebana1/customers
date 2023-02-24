import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { customerReducer } from './states/customer.reducer';
import { CustomerEffects } from './states/customer.effect';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from './icons/icons.module';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { NgbdSortableHeaderDirective } from './shared/directives/sortable/sortable.directive';
import { SaveCustomerModalComponent } from './pages/list-customer/save-customer-modal/save-customer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCustomerComponent,
    NgbdSortableHeaderDirective,
    SaveCustomerModalComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ customers: customerReducer }),
    EffectsModule.forRoot([CustomerEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    NgbModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
