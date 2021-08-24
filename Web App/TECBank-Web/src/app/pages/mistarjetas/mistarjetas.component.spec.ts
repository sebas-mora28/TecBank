import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistarjetasComponent } from './mistarjetas.component';

describe('MistarjetasComponent', () => {
  let component: MistarjetasComponent;
  let fixture: ComponentFixture<MistarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MistarjetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MistarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
