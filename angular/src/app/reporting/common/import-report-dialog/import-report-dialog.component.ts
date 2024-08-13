import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-import-report-dialog',
  templateUrl: './import-report-dialog.component.html',
  styleUrls: ['./import-report-dialog.component.css']
})
export class ImportReportDialogComponent {
  configurationGraph: string = '';

  constructor(
    public dialogRef: MatDialogRef<ImportReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onImport(): void {
    this.dialogRef.close(this.configurationGraph);
  }
}
