import { Component, OnInit } from '@angular/core';
import {Employee} from '../shared files/Employees-extension/employee';
import {Department} from '../shared files/Departments-extension/Department';
import {DepartmentService} from '../shared files/Departments-extension/department.service';
// import {Departments} from '../shared files/Departments-extension/mock-department';
import {EMPLOYEES} from '../shared files/Employees-extension/mock-employees';
// import {TASKS} from '../shared files/Tasks-extension/mock-tasks';
import { RolesList } from '../shared files/Roles-extension/mock-roles';
import {EmployeeService} from '../shared files/Employees-extension/employee.service';
import {Task} from '../shared files/Tasks-extension/task';
import {TaskService} from '../shared files/Tasks-extension/task.service';
import {map} from 'rxjs/operators';
import {RoleService} from '../shared files/Roles-extension/role.service';
import {Roles} from "../shared files/Roles-extension/roles";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public doughnutChartType = 'doughnut';
  public donutColors = [
    {
      backgroundColor: [
        '#48C9B0',
      ]
    }
  ];
  selectedDepartment:Department;
  selectedEmp:Employee;
  selectedTask:Task;
  tasks:Task[];
  roles: Roles[] = [];
  employees:Employee[];
  departments:Department[];
  constructor(public departmentService: DepartmentService, public employeeService: EmployeeService, public taskService: TaskService, public roleService: RoleService) { }
  ngOnInit(): void
  {
    this.getAllDepartments();
    this.getAllEmployees();
    this.getAllTasks();
  }
  //Counter of departments
  GetNumberofDepartments()
  {
    return this.departmentService.numberOfDepartments();
  }
   //Counter is not working properly we've been getting lot of bugs on dashboard.For that reason I will give fixed value 
   //It should count mock-data length but its not counting I've tried everything its kind of bug somethime its working sometimes not
  GetNumberofEmployees()
  {
    return 13;
  }
   //Counter of task
  GetNumberofTasks()
  {
    return this.taskService.numberOfTask();  // firestore
    // return this.taskService.countListItems();   //real-time database
  }
  //Counter of roles
  GetNumberofRoles()
  {
    this.roleService.getRolesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(roles => {
      this.roles = roles;
    });
    return this.roles.length;
  }
  //Selected department on table to change details
  DepSelect(department: Department): void
  {
    this.selectedDepartment = department;
  }
  // Selected employee on table to change details
  empSelect(secEmp: Employee): void {
    this.selectedEmp = secEmp;
  }
  //To get first 7 mock data of employee
  getAllEmployees(): void {
    this.employeeService.getLessEmployess().subscribe(employees => this.employees = employees);
  
  }
   // Selected task on table to change details
  onSelect(task: Task): void {
    this.selectedTask = task;
  }
      //To get tasks
  getAllTasks(): void {
    // this.taskService.getTask().subscribe(tasks => this.tasks = tasks);
    this.taskService.getTasks().subscribe(
      data => {
        this.tasks = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Task
          };
        });
      });
    
  }
  //To get departments
  getAllDepartments(): void {
    // this.taskService.getTask().subscribe(tasks => this.tasks = tasks);
    this.departmentService.getDepartmentList().subscribe(
      data => {
        this.departments = data.map(e => {
          return {
            key: e.payload.doc.id,
            ...e.payload.doc.data() as Department
          };
        });
      }); 
  }
}
