import { useQuery } from "@tanstack/react-query";
import User from "../../../models/User";
import { getAllUsers } from "../../../services/UserService/userService";
import useAuthStore from "../../Authentication/store";

const useUser = (isActive: boolean) => {
  const { user } = useAuthStore();

  return useQuery<User[], Error>({
    queryKey: ["usersList", { isActive: isActive, companyId: user?.companyId }],
    queryFn: getAllUsers,
  });
};
export default useUser;
