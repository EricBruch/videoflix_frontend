export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface IToken {
  key: string;
}
