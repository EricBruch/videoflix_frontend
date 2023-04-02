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

export interface Video {
  id: number;
  created_at: string;
  title: string;
  description: string;
  video_file: string;
}

export interface SelectionDropDown<T> {
  value: T;
  viewValue: string;
}
