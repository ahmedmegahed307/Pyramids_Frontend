import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { login, signup } from "../../services/AuthService/authService";
import { SignUpValidation } from "../../Pages/Authentication/components/SignUp";
import { useNavigate } from "react-router-dom";

const useSignUpValidation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  return useMutation<ResponseData, Error, SignUpValidation>(
    async (signUp: SignUpValidation): Promise<ResponseData> => {
      return await signup(signUp);
    },
    {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (error: any) => {
        console.log("error!!", error);
        Swal.fire({
          title: "Error",
          text: error.response.data.message || error.message ,
          icon: "error",
        });
        // return error.response.data.message || error.message;
      },
    }
  );
};

export default useSignUpValidation;
