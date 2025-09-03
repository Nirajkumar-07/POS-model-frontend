export class User {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.userId = data.userId;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.token = data.token;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static fromJsonData(data: any): User {
    return new User(data);
  }
}
