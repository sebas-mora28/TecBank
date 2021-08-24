import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscuentasComponent } from './miscuentas.component';

describe('MiscuentasComponent', () => {
  let component: MiscuentasComponent;
  let fixture: ComponentFixture<MiscuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
