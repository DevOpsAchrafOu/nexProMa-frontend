import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemplacerComponent } from './remplacer.component';

describe('RemplacerComponent', () => {
  let component: RemplacerComponent;
  let fixture: ComponentFixture<RemplacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemplacerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemplacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
