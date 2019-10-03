export class User {

  id : string
  name : string;
  lastname: string;
  username: string;
  password : string;

  constructor(id: string, username : string, lastname : string, name : string, password : string) {
    this.id = id
    this.username = username
    this.lastname = lastname
    this.name = name
    this.password = password
  }
}