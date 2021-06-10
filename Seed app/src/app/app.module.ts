import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { RolesComponent } from './roles/roles.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { ChartsModule } from 'ng2-charts';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { NavMainComponent } from './Sidebar/nav-main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { CalendarComponent } from './calendar/calendar.component';
import {TaskService} from './shared files/Tasks-extension/task.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    RolesComponent,
    RoleEditComponent,
    RoleDetailComponent,
    RoleAddComponent,
    DepartmentsComponent,
    EmployeesComponent,
    DashboardComponent,
    NavMainComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    FullCalendarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
