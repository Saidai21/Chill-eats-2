import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComidaChinaPage } from './comida-china.page';

describe('ComidaChinaPage', () => {
  let component: ComidaChinaPage;
  let fixture: ComponentFixture<ComidaChinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidaChinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
