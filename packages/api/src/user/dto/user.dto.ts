export class CreateUserDTO {
  _id?: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  createdAt: string;
}

export class CreateUserLoginDTO {
  email: string;
  password: string;
}
