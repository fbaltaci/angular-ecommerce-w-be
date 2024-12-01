import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutdialogComponent } from './signoutdialog.component';

describe('SignoutdialogComponent', () => {
  let component: SignoutdialogComponent;
  let fixture: ComponentFixture<SignoutdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignoutdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignoutdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
