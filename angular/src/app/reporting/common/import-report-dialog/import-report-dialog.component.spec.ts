import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportReportDialogComponent } from './import-report-dialog.component';

describe('ImportReportDialogComponent', () => {
  let component: ImportReportDialogComponent;
  let fixture: ComponentFixture<ImportReportDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportReportDialogComponent]
    });
    fixture = TestBed.createComponent(ImportReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
