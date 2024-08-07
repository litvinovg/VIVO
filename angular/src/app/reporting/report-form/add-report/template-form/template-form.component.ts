import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {StepperDataService} from "../../../services/stepper-data.service";

@Component({
  selector: 'report-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  templateForm!: FormGroup;
  @Output() templateAdded = new EventEmitter<string>();
  @Input() fileSelected!: EventEmitter<File>;
  @Input() fileDropped!: EventEmitter<File>;

  constructor(private formBuilder: FormBuilder,
              private stepperDataService: StepperDataService) { }

  handleFileAdded = (file:File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result?.toString()
          .replace('data:', '')
          .replace(/^.+,/, '');
        this.templateAdded.emit(base64String);
        this.stepperDataService.setTemplateForm(base64String ?? '');
      };
  }

  handleFileRemoved() {
    this.stepperDataService.setTemplateForm("");
  }
}
