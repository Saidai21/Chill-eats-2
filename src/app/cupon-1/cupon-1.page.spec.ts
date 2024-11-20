import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cupon1Page } from './cupon-1.page';

describe('Cupon1Page', () => {
  let component: Cupon1Page;
  let fixture: ComponentFixture<Cupon1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Cupon1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
