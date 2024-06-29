import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErrorNavbarComponent } from './page-error-navbar.component';

describe('PageErrorNavbarComponent', () => {
  let component: PageErrorNavbarComponent;
  let fixture: ComponentFixture<PageErrorNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageErrorNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErrorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
