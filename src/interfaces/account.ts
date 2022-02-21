export default interface Account {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  status: string;
  phoneNumber: string;
  avatarUrl: string;
  roleName: string;
}

export interface AccountTable {
  id: string;
  name: string;
  status: string;
  phoneNumber: string;
  email: string;
}
