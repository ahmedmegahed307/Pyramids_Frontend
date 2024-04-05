import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuthStore from "../../Authentication/store";
import User from "../../../models/User";
import { createUser } from "../../../services/UserService/userService";

const useCreateUser = (OnClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, User>(
    async (user: User): Promise<ResponseData> => {
      return await createUser(user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["usersList"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: "User has been Created successfully!",
          icon: "success",
        });
        OnClose();
      },
      onError: (error: any) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useCreateUser;
