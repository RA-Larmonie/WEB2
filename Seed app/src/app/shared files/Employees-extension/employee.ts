import { Roles } from '../Roles-extension/roles';

export class Employee {

    emp_id:number;
    emp_firstName:string;
    emp_lastName: string;
    emp_gender: string;
    emp_birthDay: string;
    emp_email: string;
    emp_role:string;
    emp_department:string
    
    constructor(emp_id:number,emp_firstname:string,emp_lastname:string,emp_gender:string,emp_birthday:string,emp_email:string,emp_role:string, emp_department:string)
    {
        this.emp_id=emp_id;
        this.emp_firstName=emp_firstname;
        this.emp_lastName=emp_lastname;
        this.emp_gender=emp_gender;
        this.emp_birthDay=emp_birthday;
        this.emp_email=emp_email;
        this.emp_role=emp_role;
        this.emp_department=emp_department;
    }

      
    
}
