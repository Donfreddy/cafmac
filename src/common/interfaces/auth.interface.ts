export interface ILogin {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: number;
  email: string;
}