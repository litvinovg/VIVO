import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './reporting/home/home.component';
import { ListComponent } from './reporting/list';
import {FaqComponent} from "./reporting/common/faq/faq.component";

const reportModule = () => import('./reporting/reporting.module').then(x => x.ReportingModule)
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'add', loadChildren: reportModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
