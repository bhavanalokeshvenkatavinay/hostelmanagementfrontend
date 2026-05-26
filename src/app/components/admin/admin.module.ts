import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
    declarations: [
        AdminDashboardComponent,
        AddStudentComponent,
        StudentListComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        HttpClientModule,
        ZXingScannerModule
    ]
})
export class AdminModule { }
