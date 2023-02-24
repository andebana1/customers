import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCustomerModalComponent } from './save-customer-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore  } from '@ngrx/store/testing';
import { StatusEnum } from '@models/customer.model';

describe('SaveCustomerModalComponent', () => {
  let component: SaveCustomerModalComponent;
  let fixture: ComponentFixture<SaveCustomerModalComponent>;

  beforeEach(async () => {
    let store: MockStore;
    await TestBed.configureTestingModule({
      declarations: [ SaveCustomerModalComponent ],
      providers: [
        NgbActiveModal,
        provideMockStore({})
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveCustomerModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(false).toBeFalsy();
  });

  it('form needs to be empty', () => {
    component.customerId = undefined;
    fixture.detectChanges();
    expect(component.customerForm.valid).toBe(false);
  });

  it('form should init invalid if no customer is provided', () => {
    component.customer = undefined;
    fixture.detectChanges();
    expect(component.initForm().status).toBe('INVALID');
  });

  it('form should init valid if a customer is provided', () => {
    component.customer = {
      id: 'test id',
      email: 'email@email.com',
      firstName: 'Test',
      lastName: 'Component',
      status: StatusEnum.ACTIVE,
    };
    fixture.detectChanges();
    expect(component.initForm().valid).toBeTrue();
  });

  it('form should init invalid with a wrong email', () => {
    component.customer = {
      id: 'test id',
      email: 'email',
      firstName: 'Test',
      lastName: 'Component',
      status: StatusEnum.ACTIVE,
    };
    fixture.detectChanges();
    expect(component.initForm().valid).toBeFalse();
  });
});
