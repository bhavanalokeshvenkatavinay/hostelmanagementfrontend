import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { PermissionCardComponent } from './permission-card/permission-card.component';

@NgModule({
    declarations: [
        StudentDashboardComponent,
        PermissionCardComponent
    ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        FormsModule,
        HttpClientModule
    ]
})
export class StudentModule { }
