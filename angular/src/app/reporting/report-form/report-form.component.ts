import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ConstructFormComponent} from './add-report/construct-form/construct-form.component';
import {ExportFormComponent} from './add-report/export-form/export-form.component';
import {TemplateFormComponent} from './add-report/template-form/template-form.component';
import {first, Subscription} from 'rxjs';
import {Report} from '../models/report';
import {ReportService} from '../services/report.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatStepper} from '@angular/material/stepper';
import {StepperDataService} from '../services/stepper-data.service';
import {Construct} from "../models/construct";
import {Select} from "../models/select";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";


const CONSTRUCT_INDEX: number = 0;
const SELECT_INDEX: number = 1;
const TEMPLATE_INDEX: number = 2;
const EXPORT_INDEX: number = 3;

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    }
  ]
})
export class ReportFormComponent implements AfterViewInit {
  currentStepIndex: number = 0;
  subsetFormSubscription!: Subscription;
  allFormsValid: boolean = false;
  report: Report = {} as Report;
  constructs: Construct[] = {} as Construct[];
  selects: Select[] = {} as Select[];
  template: string = "" as string;
  isButtonVisible = true;
  response!: any[];

  @ViewChild(ConstructFormComponent)
  subsetComponent!: ConstructFormComponent;
  @ViewChild(ConstructFormComponent)
  criteriaComponent!: ConstructFormComponent;
  @ViewChild(TemplateFormComponent)
  templateComponent!: TemplateFormComponent;
  @ViewChild(ExportFormComponent)
  exportComponent!: ExportFormComponent;


  constructor(private reportService: ReportService,
              private stepperDataService: StepperDataService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngAfterViewInit() {
    this.handleSubscriptions();
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotify($event: any): void {
  //   $event.returnValue = true;
  // }

  private handleSubscriptions() {

  }

  private handleFormCheck() {
    this.handleDatabaseFormCheck();
  }

  private handleDatabaseFormCheck() {

  }

  private clearIncorError(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.remove('mat-step-icon-invalid');
  }

  private getIconElementByIndex(index: number): HTMLElement {
    let nodeList: NodeList = document.querySelectorAll('.mat-step-icon');
    let node: Node = nodeList.item(index) as Node;
    return (<HTMLElement>node);
  }

  handleConstructAdded(constructs: Construct[]) {
    this.report.construct_queries = constructs;
    console.log('handleConstructAdded', this.report.construct_queries)
  }

  handleSelectAdded(selects: Select[]) {
    this.report.select_queries = selects;
    console.log('handleSelectAdded', this.report.select_queries)
  }

  handleTemplateAdded(template: string) {
    this.report.template = template;
  }

  updateReportName(name: string) {
    this.stepperDataService.setReportName(name);
    this.report.report_generator_name = this.stepperDataService.getReportName();
  }

  updateReportDescription(description: string) {
    this.stepperDataService.setReportDescription(description);
    this.report.report_generator_description = this.stepperDataService.getReportDescription();
  }

  onStepChange(event: any) {
    let previousIndex: number = event.previouslySelectedIndex;
    this.currentStepIndex = event.selectedIndex;

    if (previousIndex == CONSTRUCT_INDEX) {
      this.constructs = this.stepperDataService.getConstructForm()
      console.log('SUBSET_INDEX: \n' + JSON.stringify(this.constructs));
      this.handleConstructAdded(this.constructs);
    }
    else if (previousIndex == SELECT_INDEX) {
      this.selects = this.stepperDataService.getSelectForm();
      console.log('CRITERIA_INDEX');
      this.handleSelectAdded(this.selects)
    }
    else if (previousIndex == TEMPLATE_INDEX) {
      this.template = this.stepperDataService.getTemplateForm();
      if (this.template === "") {
        alert("Your template is empty");
      }
      console.log('TEMPLATE_INDEX: \n' + this.template);
    }
  }

  isCurrentStep(stepIndex: number): boolean {
    return this.currentStepIndex === stepIndex;
  }

  valueFromChild!: boolean;
  hideStepperButtons(valueEmitted: any) {
      this.isButtonVisible = valueEmitted;
      console.log("(Parent) Value emitted: " + valueEmitted);
  }

  saveReport() {
    console.log('this.report', this.report);
    this.reportService.create(this.report)
      .pipe(first())
      .subscribe(data => {
        let result :string[] = []
        this.router.navigate(['../list'], { relativeTo: this.route});
      });
  }

  private changeIcon(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    console.log('HTMLElement icon index: ', HTMLElement);
    iconElement.classList.add('mat-step-icon-invalid');
    console.log('HTMLElement icon index: ', HTMLElement);
  }

  private clearIconError(index: number) {
    let iconElement: HTMLElement = this.getIconElementByIndex(index);
    iconElement.classList.remove('mat-step-icon-invalid');
  }

  setIndex(event: any) {
    this.currentStepIndex = event.selectedIndex;
  }

  triggerClick() {
    console.log("Selected index: ", this.currentStepIndex);
  }

  onNext(stepper: MatStepper) {
    console.log('test');
    this.stepperDataService.getData().subscribe(data => {
      console.log('this.data from next(): ', this.response);
    })
    stepper.next();
  }
}
