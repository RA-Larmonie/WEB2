import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared files/Employees-extension/employee';
import { EmployeeService } from '../shared files/Employees-extension/employee.service';
import {Department} from '../shared files/Departments-extension/Department';
import {DepartmentService} from '../shared files/Departments-extension/department.service';
import {Roles} from '../shared files/Roles-extension/roles';
import {RolesList} from '../shared files/Roles-extension/mock-roles';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService:EmployeeService, private departmentService:DepartmentService) { }

  //Search function
  searchText;
  employees:Employee[];
  selectedEmp: Employee;
  gender: string[];
  departments:Department[];
  department:string;
  roles=RolesList;
  
  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartments();
  }
  //Get all employees from mock-data
  getAllEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees=employees);
  }
 //Get all departments from mock-data
  getAllDepartments():void {
   this.departmentService.getDepartments().subscribe(departments=>this.departments=departments);
  }
//Get new id auto-incremented
  getNewID(): number {
    return this.employeeService.generateID(this.employees);
  }

  empSelect(secEmp: Employee): void {
    this.selectedEmp = secEmp;
  }
  //Add employee functionality
  addEmployee(employee_firstName: string, employee_lastName: string, employee_gender: string, employee_birthDay: string, employee_email: string): void {
    if(!employee_firstName || !employee_lastName || !employee_gender || !employee_birthDay || !employee_email) {
      return;
    }
    let newEmp:Employee = {emp_id: this.employeeService.generateID(this.employees),emp_firstName:employee_firstName,emp_lastName:employee_lastName,emp_gender:employee_gender,emp_birthDay:employee_birthDay,emp_email:employee_email,emp_role:'Employee',emp_department:''};
    this.employees.push(newEmp);
  }
//Remove employee functinality
  removeEmployee(remove_id:number) {
    for(var i=0; i < this.employees.length; i++) {
      if (this.employees[i]["emp_id"] === remove_id) {
        this.employees.splice(i,1);
      }
    }
  }
  

}
