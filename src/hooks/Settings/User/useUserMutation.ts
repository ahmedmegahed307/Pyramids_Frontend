import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import User from "../../../models/User";
import {
  deleteUser,
  restoreUser,
  updateUser,
} from "../../../services/UserService/userService";

const useUserMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean,
  isRestore?: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, User | number>(
    async (user: User | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (user as User).id;
        return await updateUser(id ?? 0, user);
      } else if (isRestore) {
        return await restoreUser(user as number);
      } else {
        const id = user as number;
        return await deleteUser(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["usersList"],
        });
        queryClient.invalidateQueries({
          queryKey: ["userById"],
        });
        // handle success
        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "User has been updated successfully!"
            : "User has been Deactivated successfully!",
          icon: "success",
        });
        onUpdateOrDelete();
      },
      onError: (error: any) => {
        console.log("errorssss", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      },
    }
  );
};

export default useUserMutation;
