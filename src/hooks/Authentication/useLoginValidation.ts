import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { LoginInValidation } from "../../Pages/Authentication/components/Login";
import { login } from "../../services/AuthService/authService";

const useLoginValidation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, LoginInValidation>(
    async (signin: LoginInValidation): Promise<ResponseData> => {
      return await login(signin);
    },
    {
      onSuccess: () => {
   
      },
      onError: (error: any) => {
        console.log("error", error);
        // Swal.fire({
        //   title: "Error",
        //   text: error.response.data.message || error.message ,
        //   icon: "error",
        // });
        return error.response.data.message || error.message;
      },
    }
  );
};

export default useLoginValidation;
