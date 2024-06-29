import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMianFooterComponent } from './home-mian-footer.component';

describe('HomeMianFooterComponent', () => {
  let component: HomeMianFooterComponent;
  let fixture: ComponentFixture<HomeMianFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMianFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMianFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
