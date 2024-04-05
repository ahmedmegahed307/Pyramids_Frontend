import { useQuery } from "@tanstack/react-query";

import useAuthStore from "../Authentication/store";
import { getContractList } from "../../services/PPM/PPMService";
import { IContract } from "../../models/Interfaces/IContract";

const useContract = (isActive: boolean) => {
  const { user } = useAuthStore();

  return useQuery<IContract[], Error>({
    queryKey: [
      "contractList",
      { isActive: isActive, companyId: user?.companyId },
    ],
    queryFn: getContractList,
  });
};

export default useContract;
