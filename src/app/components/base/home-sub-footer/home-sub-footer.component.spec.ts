import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSubFooterComponent } from './home-sub-footer.component';

describe('HomeSubFooterComponent', () => {
  let component: HomeSubFooterComponent;
  let fixture: ComponentFixture<HomeSubFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSubFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSubFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
