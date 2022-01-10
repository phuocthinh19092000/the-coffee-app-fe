export type UserParams = {
  username: string;
  password: string;
  deviceToken: string;
};
export type LogoutParams = {
  deviceToken: string | null;
};
