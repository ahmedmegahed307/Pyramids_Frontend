import { LoginInValidation } from "../../Pages/Authentication/components/Login";
import { SignUpValidation } from "../../Pages/Authentication/components/SignUp";
import SignUp from "../../models/SignUp";
import Api from "../api-fetch";

interface ResetPasswordPayload {
  Email: string;
  Password: string;
  ResetPasswordCode: string;
}


  export const login = async (loginInData:LoginInValidation) => {
    const logInAPI = new Api<any>("/Auth/login");
    const response= await logInAPI.post(loginInData);
      return response;
  };

  export const signup = async (signupData: SignUpValidation) => {
    const signupApi = new Api<any>("/Auth/register-admin");
    const response = await signupApi.post(signupData);
    return response;
  };

  export const forgotPassword = async (email: string): Promise<any> => {
    var forgetPasswordApi = new Api("/Auth/forgotpassword" + "?email=" + email);
    const response = await forgetPasswordApi.postQuery();
    return response.code;
  };

  export const confirmCode = async (email: string, token: string): Promise<any> => {
    var confirmResetPasswordApi = new Api(
      "/Auth/confirmcode" + "?email=" + email + "&guardCode=" + token.toString()
    );
    const response = await confirmResetPasswordApi.postQuery();
    return response.code;
  };

  export const resetPassword = async (
    email: string,
    password: string,
    token: string
  ): Promise<any> => {
    var resetPasswordApi = new Api<ResetPasswordPayload>("/Auth/resetpassword");
    const response = await resetPasswordApi.post({
      Email: email,
      Password: password,
      ResetPasswordCode: token,
    });
    return response.code;
  };



