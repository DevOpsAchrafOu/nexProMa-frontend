import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappLeftComponent } from './whatsapp-left.component';

describe('WhatsappLeftComponent', () => {
  let component: WhatsappLeftComponent;
  let fixture: ComponentFixture<WhatsappLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
