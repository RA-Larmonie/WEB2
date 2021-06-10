import { Component, OnInit } from '@angular/core';
import {Department} from '../shared files/Departments-extension/Department';
import {DepartmentService} from '../shared files/Departments-extension/department.service';
import {EMPLOYEES } from '../shared files/Employees-extension/mock-employees';
import { DepartmentEmployee } from '../shared files/Departments-extension/DepartmentEmployees';
import { stringify } from 'querystring';
import {Employee} from '../shared files/Employees-extension/employee';
import {EmployeeService} from '../shared files/Employees-extension/employee.service';



@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  get searchTerm(): string {
    return this._searchText;
  }
  set searchTerm(value) {
    this._searchText = value;
    this.filterDepartments = this.filteredDepartments(value);
  }
  constructor(private departmentService:DepartmentService,public employeeService:EmployeeService) { }

  //Search function
  departments:Department[];
  selectedDepartment:Department;
  employee:string;
  employees:Employee[];
  filterDepartments:Department[];
  private _searchText: string;
  // editedD_id:any;
  // editedD_name:any;
  // editedD_location:any;
  // editedD_employees:any;

  //Get all Departments for mock data
  //Add department
  // addDepartment(department_name:string):void
  // {
  //   if(!department_name)
  //   {
  //     return;
  //   }
  //   let NewDepartment:Department=new Department(this.departmentService.GenerateID(this.departments),department_name,this.departmentService.GenerateLoc(this.departments),this.employee);
  //   this.departments.push(NewDepartment);
  // }
  ngOnInit(): void
  {
    this.getDepartmentList();
    this.getAllEmployees();
  }
  filteredDepartments(searchString: string) {
    return  this.departments.filter(task =>
      task.department_name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  GetAllDepartments():void
  {
   this.departmentService.getDepartments().subscribe(departments=>this.departments=departments);
  }
  DepSelect(department:Department):void
  {
    this.selectedDepartment=department;
  }
  //Remove department from mock-data #not using anymore
  removeDepartmenttt(Name)
  {
    for(var i=0;i<this.departments.length;i++)
    {
      if(this.departments[i]["department_name"]==Name)
      {
        this.departments.splice(i,1);
      }
    }
  }
  //Get new id auto-incremented #not using anymore
  getNewID(): number {
    return this.departmentService.GenerateID();
  }
  //Get new location id auto-incremented #not using anymore
  getNewLocID():number
  {
    return this.departmentService.GenerateLoc();
  }
  //Get employee for dropdown menu 
  getAllEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }
  // add department to db
  addDep(Departmentid:number,DepartmentName: string, emp: string,deploc:string) {
    if (!DepartmentName) {
      return;
    }

    const NewDepartment: Department = {department_id:Departmentid,department_name: DepartmentName, department_location: deploc ,
    employees: emp};
    this.departmentService.addDepartment(NewDepartment);
    
  }
  //Get department list from db
  getDepartmentList() {
    this.departmentService.getDepartmentList().subscribe(
      data => {
        this.filterDepartments = data.map(e => {
          return {
            key: e.payload.doc.id,
            ...e.payload.doc.data() as Department
          };
        });
      });
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
  //Remove department from db
  removeDepartments(department: string): void
  {
  this.departmentService.deleteDepartment(department);
  }

  //Edit department on db (firebase)
  editDep(editedD_id:number,editedD_name: string, editedD_location: string, editedD_employees: string) 
  {
    if (!editedD_name || !editedD_location) {
      return;
    }
    const EditDep: Department = {department_id:editedD_id,department_name: editedD_name, department_location: editedD_location,
    employees: editedD_employees};
    //   firestore
    this.departmentService.updateDepartment(this.selectedDepartment, EditDep);
    
  }
}
