import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-material-file-uploader',
  templateUrl: './material-file-uploader.component.html',
  styleUrls: ['./material-file-uploader.component.css']
})
export class MaterialFileUploaderComponent {
  @Input() requiredFileTypes: string = '';
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileDropped = new EventEmitter<File>();
  @Output() fileRemoved= new EventEmitter<null>();
  uploadedFile: File | null = null;

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      if (this.isValidFileType(file)) {
        this.fileSelected.emit(file);
        this.uploadedFile = file;
      } else {
        alert(`Invalid file type. Please upload one of the following file types: ${this.requiredFileTypes}.`);
      }
    }
  }

  onFileDropped(files: FileList) {
    if (files && files.length > 0) {
      const file: File = files[0];
      if (this.isValidFileType(file)) {
        this.fileDropped.emit(file);
        this.uploadedFile = file;
      } else {
        alert(`Invalid file type. Please upload one of the following file types: ${this.requiredFileTypes}.`);
      }
    }
  }

  cancelUpload() {
    this.uploadedFile = null;
    this.fileRemoved.emit(null);
  }

  private isValidFileType(file: File): boolean {
    const allowedTypes = this.requiredFileTypes.split(',').map(type => type.trim());
    return allowedTypes.includes(file.type);
  }
}
