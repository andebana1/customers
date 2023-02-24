import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer, StatusEnum } from '@models/customer.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CustomerService } from '@services/customer/customer.service';
import { saveCustomerModalAction } from '@states/customer.actions';

@Component({
  selector: 'app-save-customer-modal',
  templateUrl: './save-customer-modal.component.html',
  styleUrls: ['./save-customer-modal.component.scss']
})
export class SaveCustomerModalComponent implements OnInit {
  public customerStatus = StatusEnum;
  public customerForm!: FormGroup;
  public customer?: Customer;

  @Input() public customerId?: string;

  constructor(
    public modal: NgbActiveModal,
    private customerService: CustomerService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    if (this.customerId) {
      this.customer = this.customerService.findOneById(this.customerId);
    }
    this.customerForm = this.initForm();
  }

  public initForm(): FormGroup {
     return new FormGroup({
      firstName: new FormControl(
        this.customer?.firstName ?? '', [
        Validators.required,
      ]),
      lastName: new FormControl(this.customer?.lastName ?? '', [
        Validators.required,
      ]),
      email: new FormControl(this.customer?.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      status: new FormControl(this.customer?.status ?? '', [
        Validators.required,
      ]),
      phone: new FormControl(this.customer?.phone ?? null),
    });
  }

  public setStatusOption(status: string) {
    this.customerForm.get('status')?.setValue(status);
  }

  public saveCustomer(): void {
    const customer: Customer = {
      id: this.customerId,
      ...this.customerForm.value
    };

    this.store.dispatch(saveCustomerModalAction({customer}));
    this.modal.dismiss();
  }
}
