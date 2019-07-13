import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBanksComponent } from './favorite-banks.component';

describe('FavoriteBanksComponent', () => {
  let component: FavoriteBanksComponent;
  let fixture: ComponentFixture<FavoriteBanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteBanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
