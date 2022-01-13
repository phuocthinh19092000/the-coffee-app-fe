export type UserParams = {
  username: string;
  password: string;
  deviceToken: string | undefined;
};
export type LogoutParams = {
  deviceToken: string | undefined;
};
