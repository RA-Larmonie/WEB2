import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from './Department';
// import {Departments} from './mock-department';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments:Department[];
  constructor(private fs: AngularFirestore) { }
    //Get whole mock department data
  getDepartments(): Observable<Department[]>
  {
    return;
  }
    //Auto incremented  id
  GenerateID(): number
  {

   if(this.getDepartmentList == null)
   {
     return 0;
   }

     return this.numberOfDepartments()+1;    
  }
  //Auto incremented location id
  GenerateLoc(): number
  {
    if(this.getDepartmentList == null)
    {
      return 0;
    }
      return this.numberOfDepartments()+1; 
  }
  //Get first 6 department from mock data
  getLessDepartments()
  {
    return;
  }

//Get department list from firebase
 getDepartmentList() {
  return this.fs.collection('/department').snapshotChanges();
}

//add department to firebase
addDepartment(department: Department) {
  return this.fs.collection('/department').add(department);
}

//delete department to firebase
deleteDepartment(key: string) {
  this.fs.doc('/department/' + key).delete();
}

updateDepartment(department: Department, value: any) {
  return this.fs.collection('/department/').doc(department.key).set(value);
}

//Get amount of data in department list from firebase for graphs on dashboard
numberOfDepartments(): number {
  this.getDepartmentList().subscribe(
    data => {
      this.departments = data.map(e => {
        return {
          key: e.payload.doc.id,
          ...e.payload.doc.data() as Department
        };
      });
    });
  return this.departments.length;
}
}

