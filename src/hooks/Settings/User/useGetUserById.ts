import { useQuery } from "@tanstack/react-query";
import User from "../../../models/User";
import { getUserById } from "../../../services/UserService/userService";


const useGetUserById = (id: number) => {
  return useQuery<User, Error>(
    ["userById", { id }],
    () => getUserById(id)
  );
};

export default useGetUserById;
