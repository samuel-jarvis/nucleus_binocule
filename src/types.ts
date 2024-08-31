export interface ILogin {
  emailOrByteId: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string; // Remember to avoid storing passwords in plain text.
  firstName: string;
  lastName: string;
  phoneNumber: string; // Consider using a specific phone number type if needed.
  address: string;
  country: string;
  dob: string; // Consider using a Date type for proper date handling.
  photo: string; // Consider a URL type for stricter validation.
}

export interface IRegister extends IRegisterRequest {
  confirmPassword: string;
}