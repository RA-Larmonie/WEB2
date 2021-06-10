import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor() { }

  ////Get whole mock employeee data
  getEmployees():Observable<Employee[]> {
    return of(EMPLOYEES);
  }
//Auto incremented  id
  generateID(emps:Employee[]): number {
    return emps.length > 0?
    Math.max(...emps.map(user => user.emp_id))+1:11;
  }
   //Get first 7 department from mock data
  getLessEmployess():Observable<Employee[]>
  {
    return of (EMPLOYEES.splice(0,7));
  }
}
