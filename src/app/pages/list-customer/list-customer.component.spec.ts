import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerComponent } from './list-customer.component';
import { CustomerService } from '@services/customer/customer.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import customerSeed from '@models/customer.seed';
import { By } from '@angular/platform-browser';
import { BootstrapIcons } from 'ng-bootstrap-icons';
import { IconsModule } from 'src/app/icons/icons.module';
import { of } from 'rxjs';

class MockCustomerService {
  
}

const initialState: any = {
  customerList: customerSeed()
}

describe('ListCustomerComponent', () => {
  let component: ListCustomerComponent;
  let fixture: ComponentFixture<ListCustomerComponent>;
  let customerService: CustomerService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgbModule,
        IconsModule
      ],
      declarations: [ ListCustomerComponent ],
      providers: [
        BootstrapIcons,
        NgbModal,
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    customerService = TestBed.inject(CustomerService);
    fixture = TestBed.createComponent(ListCustomerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(false).toBeFalsy();
  });

  it('Number of rows must be the same of the number of customers', () => {
    fixture.detectChanges();
    component.customers$ = of(customerSeed());
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('tbody')).queryAll(By.css('tr'));
    expect(table.length).toEqual(customerSeed().length);
  })
});
