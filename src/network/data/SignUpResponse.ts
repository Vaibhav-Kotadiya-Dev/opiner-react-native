export interface SignUpResponse {
  _id: string;
  email_verified: boolean;
  email: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  over18: boolean;
  agreeTerms: boolean;
}

export interface SignUpSuccessResponse {
  Id: number;
  FirstName: string;
  LastName: string;
  Token: string;
}
