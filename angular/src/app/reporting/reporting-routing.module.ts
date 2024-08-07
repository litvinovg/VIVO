import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportFormComponent } from "./report-form/report-form.component";
import {ListComponent} from "./list";

const routes: Routes = [
    {
        path: '', component: ReportFormComponent,
        children: [
            { path: '', component: ListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubsetsRoutingModule { }
