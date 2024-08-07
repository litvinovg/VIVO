import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {first} from 'rxjs';
import {Report} from '../models/report';
import {ReportService} from '../services/report.service';
import {UpdReport} from "../models/updReport";
import {ConfirmDialogComponent} from "../common/confirm-dialog/confirm-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {ImportReportDialogComponent} from "../common/import-report-dialog/import-report-dialog.component";

interface ApiResponse {
  reports: UpdReport[];
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'action'];
  report!: Report[];
  selects!: Report[];
  selectedRowIndex = -1;

  dataSource = new MatTableDataSource<UpdReport>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reportService: ReportService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.reportService.getAll().subscribe((response: ApiResponse) => {
      this.dataSource.data = response.reports;
      console.log(this.dataSource.data);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteReport(resourceId: string) {
    this.reportService
      .delete(btoa(resourceId))
      .pipe(first())
      .subscribe(() => {
        // Update the dataSource after deletion
        this.dataSource.data = this.dataSource.data.filter(
          (r) => r.resource_id.value !== resourceId
        );
      });
  }

  confirmDelete(resourceId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteReport(resourceId);
      }
    });
  }

  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportReportDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.importReport(result);
      }
    });
  }

  importReport(configurationGraph: string): void {
    this.reportService.import(configurationGraph)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Imported configuration graph:', configurationGraph);
          this.getData();  // Refresh data source
        },
        error: (error) => {
          console.error('Error importing configuration graph:', error);
        }
      });
  }

  editReport(resourceId: string) {
    fetch('http://localhost:8080/vitro/api/rest/1/report_generator', {
      method: 'GET',
    }).then(r => console.log(r));
  }

  downloadReport(resourceId: string) {
    this.reportService.execute(resourceId).subscribe((response) => {
      const base64Data = response.report;
      const blob = this.base64ToBlob(base64Data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  base64ToBlob(base64: string, contentType: string) {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  downloadSettings(resourceId: string) {
    this.reportService.export(resourceId).subscribe((response) => {
      const configGraph = response.report_generator_configuration_graph;
      const blob = new Blob([configGraph], {type: 'text/plain'});
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'config.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log(response);
    })
  }

  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }
}
