import { useQuery } from "@tanstack/react-query";
import User from "../../../models/User";
import { getAllEngineers } from "../../../services/UserService/userService";
import useAuthStore from "../../Authentication/store";

const useEngineer = (isActive: boolean) => {
  const { user } = useAuthStore();

  return useQuery<User[], Error>({
    queryKey: [
      "engineersList",
      { isActive: isActive, companyId: user?.companyId },
    ],
    queryFn: getAllEngineers,
  });
};
export default useEngineer;
