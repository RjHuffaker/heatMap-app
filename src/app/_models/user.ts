export class User {
  id?: number;
  token?: string;
  exp?: number;
  username: string;
  password: string;
  role: string;
  preferences?: string;
  techList?: string;
}