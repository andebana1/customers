import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCustomerModalComponent } from './save-customer-modal.component';

describe('SaveCustomerModalComponent', () => {
  let component: SaveCustomerModalComponent;
  let fixture: ComponentFixture<SaveCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveCustomerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
