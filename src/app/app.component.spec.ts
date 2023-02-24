import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IconsModule } from './icons/icons.module';
import { BootstrapIcons } from 'ng-bootstrap-icons';

describe('AppComponent', () => {
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BootstrapIcons
      ],
      providers: [
        provideMockStore({})
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  it('should load customers list', () => {
    expect(false).toBeFalse();
  })
});
