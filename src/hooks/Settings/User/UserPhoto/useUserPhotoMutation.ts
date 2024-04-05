import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IUserProfilePhoto } from "../../../../models/Interfaces/IUserProfilePhoto";
import { updateUserPhoto } from "../../../../services/UserService/userService";

const useUserPhotoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, IUserProfilePhoto>(
    async (userPhoto: IUserProfilePhoto): Promise<ResponseData> => {
      const id = (userPhoto as IUserProfilePhoto).userId;
      return await updateUserPhoto(id, userPhoto.userPhoto);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["userById"],
        });

        Swal.fire({
          title: "Success",
          text: "Photo has been updated successfully!",
          icon: "success",
        });
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

export default useUserPhotoMutation;
