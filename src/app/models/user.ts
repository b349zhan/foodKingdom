import { Role } from "./role";

export class User {
    displayName: string;
    email: string;
    role: Role;
    create_date_time: string;
    last_log_in: string;

    constructor(displayName:string, email:string, role:Role, create_date_time:string, last_log_in:string){
        this.displayName = displayName;
        this.email = email;
        this.role = role;
        this.create_date_time = create_date_time;
        this.last_log_in = last_log_in;
    }
}

