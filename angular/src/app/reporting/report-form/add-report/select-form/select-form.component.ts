import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperDataService } from 'src/app/reporting/services/stepper-data.service';
import { Subscription } from 'rxjs';
import {Select} from "../../../models/select";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'report-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.css']
})
export class SelectFormComponent implements OnInit {
  selectQueryForm!: FormGroup;
  array!: any[];
  toggleOn!: boolean;
  edited!: boolean;
  displayedColumns: string[] = ['name', 'description', 'graph','action'];
  selectedRowIndex = -1;
  dataSource = new MatTableDataSource<any>([]);
  private subscription!: Subscription;
  selects: Select[] = [];
  @Output() selectAdded = new EventEmitter<Select[]>();
  @Output() public toggleControler = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private stepperDataService: StepperDataService) { }

  ngOnInit(): void {
    this.selectQueryForm = this.formBuilder.group({
          name: [''],
          description: ['',Validators.pattern('[A-Za-z \-\_]+')],
          selectQuery: [''],
          graph: [''],
    },
    {updateOn: "blur"})

    this.subscribe();
  }

  subscribe(): void {
    this.subscription = this.stepperDataService.getData().subscribe((data: any) => {
      this.array = this.stepperDataService.getConstructForm();
      console.log('data criteria form: ', this.array);
    })
  }

  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }

  remove(name: string) {
    this.selects = this.selects.filter((r) => r.name !== name);
    this.dataSource.data = this.dataSource.data.filter((r) => r.name !== name);
    this.stepperDataService.setSelectForm(this.selects);
  }

  edit(name: string) {
    this.toggleInstructions(this.toggleOn);
    let object = this.dataSource.data.filter((r) => r.name === name);
    this.dataSource.data.splice(this.dataSource.data.indexOf(object[0]), 1)
    this.selectQueryForm.reset();
    this.selectQueryForm.setValue(object[0]);
    this.edited = true;
  }

  onSubmit() {
    if (!this.selectQueryForm.valid) {
      return;
    }

    if (!this.dataSource.data.find((row) => row.name === this.selectQueryForm.controls['name'].value)) {
      this.dataSource.data.push(this.selectQueryForm.value);
      this.selects.push(this.selectQueryForm.value);
      this.stepperDataService.setSelectForm(this.selects);
      this.toggleInstructions(this.toggleOn);
      this.selectQueryForm.reset();
    } else {
      alert("Name should be unique (already exists in table)");
    }
  }

  toggleInstructions(event: any) {
    this.toggleOn = !this.toggleOn;
    this.toggleControler.emit(!this.toggleOn);
  }

}
