class SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  isActive: boolean;

  constructor(
    email: string = "",
    password: string = "",
    firstName: string = "",
    lastName: string = "",
    companyName: string = "",
    isActive: boolean = false
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.companyName = companyName;
    this.isActive = isActive;
  }
}

export default SignUp;
