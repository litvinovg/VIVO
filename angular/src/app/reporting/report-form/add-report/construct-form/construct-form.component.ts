import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { StepperDataService } from 'src/app/reporting/services/stepper-data.service';
import {Construct} from "../../../models/construct";

@Component({
  selector: 'report-construct-form',
  templateUrl: './construct-form.component.html',
  styleUrls: ['./construct-form.component.css'],
})
export class ConstructFormComponent implements OnInit {
  modelForm!: FormGroup;
  displayedColumns: string[] = ['name', 'description','action'];
  toggleOn!: boolean;
  dataSource = new MatTableDataSource<any>([]);
  selectedRowIndex = -1;
  edited!: boolean;
  constructs: Construct[] = [];

  @Output() constructAdded = new EventEmitter<Construct[]>();
  @Output() public toggleControler = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private stepperDataService: StepperDataService,
  ) { }

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.pattern('[A-Za-z \-\_]+')],
      constructQuery: ['', Validators.required],
    })
  }

  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }

  deleteGraph(name: string) {
    this.constructs = this.constructs.filter((r) => r.name !== name);
    this.dataSource.data = this.dataSource.data.filter((r) => r.name !== name);
    this.stepperDataService.setConstructForm(this.constructs);
  }

  editGraph(name: string) {
    this.toggleInstructions(this.toggleOn);
    let object = this.dataSource.data.filter((r) => r.name === name);
    this.dataSource.data.splice(this.dataSource.data.indexOf(object[0]), 1)
    this.modelForm.reset();
    this.modelForm.setValue(object[0]);
    this.edited = true;
  }

  onSubmit() {
    if (!this.modelForm.valid)
      return;

    if (!this.dataSource.data.find((row) => row.name === this.modelForm.controls['name'].value)) {
      this.dataSource.data.push(this.modelForm.value);
      this.constructs.push(this.modelForm.value);
      this.stepperDataService.setConstructForm(this.constructs);
      this.toggleInstructions(this.toggleOn);
      this.modelForm.reset();
    } else {
      alert("Name should be unique (already exists in table)");
    }
  }

  toggleInstructions(event: any) {
    this.toggleOn = !this.toggleOn;
    this.toggleControler.emit(!this.toggleOn);
    this.modelForm.reset();
  }

  getErrorMessage() {
    return this.modelForm.controls['name'].hasError('required') ? 'Name is required' :
        '';
  }

}
