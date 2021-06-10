import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesComponent} from '../app/roles/roles.component';
import {RoleDetailComponent} from '../app/roles/role-detail/role-detail.component';
import {RoleAddComponent} from '../app/roles/role-add/role-add.component';
import {RoleEditComponent} from '../app/roles/role-edit/role-edit.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {DepartmentsComponent} from '../app/departments/departments.component';
import {TasksComponent} from '../app/tasks/tasks.component';
import {DashboardComponent} from '../app/dashboard/dashboard.component';
import {CalendarComponent} from './calendar/calendar.component';
import {NavMainComponent} from '../app/Sidebar/nav-main.component';


const routes: Routes = [
  {
  path: 'roles',
  component: RolesComponent
},
  {
    path: 'role-detail/:id',
    component: RoleDetailComponent,
    data: { title: 'Role Details' }
  },
  {
    path: 'role-add',
    component: RoleAddComponent,
    data: { title: 'Add Role' }
  },
  {
    path: 'role-edit/:id',
    component: RoleEditComponent,
    data: { title: 'Edit Product' }
  },
  {
    path: 'employees',
    component: EmployeesComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path:'sidebar',
    component:NavMainComponent
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
