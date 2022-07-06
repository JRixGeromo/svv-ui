import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysteryboxComponent } from './mysterybox.component';

describe('MysteryboxComponent', () => {
  let component: MysteryboxComponent;
  let fixture: ComponentFixture<MysteryboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysteryboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysteryboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
