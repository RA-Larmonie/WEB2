import { Component, OnInit } from '@angular/core';
import {Roles} from '../shared files/Roles-extension/roles';
import { map } from 'rxjs/operators';
import {RolesList} from '../shared files/Roles-extension/mock-roles';
import {NgForm} from '@angular/forms';
import {RoleService} from '../shared files/Roles-extension/role.service';
import {Department} from '../shared files/Departments-extension/Department';
import {DepartmentService} from '../shared files/Departments-extension/department.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  searchText;
  role: Roles = new Roles();
  submitted = false;
  selectedRole: Roles;
  roles: Roles[] = [];
  filterRole: Roles[];
  departments: Department[] = [];

  get searchTerm(): string {
    return this.searchText;
  }
  set searchTerm(value) {
    this.searchText = value;
    this.filterRole = this.filteredRole(value);
  }

  constructor(private roleService: RoleService, private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.getRolesList();
    this.getDepartmentList();
  }
  filteredRole = (searchString: string) => this.roles.filter(role =>
    role.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  //Get department list from db
  getDepartmentList() {
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

  //Get Roles list from db
  getRolesList() {
    this.roleService.getRolesList().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(roles => {
    this.roles = roles;
  });
  }

  //Add new Role
  newRole(): void {
    this.submitted = false;
    this.role = new Roles();
  }

  save() {
    this.roleService.createRole(this.role);
    this.role = new Roles();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  // Delete Customer
  deleteCustomers() {
    this.roleService.deleteAll().catch(err => console.log(err));
  }

  // tslint:disable-next-line:variable-name
  updateRole(key: string, edited_name:string, edited_department:string) {
    if (!edited_name || !edited_department) {
      return;
    }
    this.roleService
      .updateRole(key, { department: edited_department, name: edited_name})
      .catch(err => console.log(err));
  }

  //Get role by id
  getRoleById(id: string) {
    this.roles.map(role => {
      if (role.key === id) {
        this.selectedRole = role;
      }
    });
  }

  //Delete Role
  deleteRole(id: string) {
    this.roleService.deleteRole(id);

  }
}

// https://grokonez.com/frontend/angular/angular-8/angular-8-firebase-tutorial-crud-operations-angular-fire-example
