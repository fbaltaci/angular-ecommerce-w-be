import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutDialogComponent } from './logout-dialog.component';

describe('SignoutdialogComponent', () => {
  let component: LogOutDialogComponent;
  let fixture: ComponentFixture<LogOutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogOutDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});