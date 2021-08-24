import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisprestamosComponent } from './misprestamos.component';

describe('MisprestamosComponent', () => {
  let component: MisprestamosComponent;
  let fixture: ComponentFixture<MisprestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisprestamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisprestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
