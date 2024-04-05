import { useQuery } from "@tanstack/react-query";

import useAuthStore from "../Authentication/store";
import {  getVisitList } from "../../services/PPM/PPMService";
import { IVisit } from "../../models/Interfaces/IVisit";


const useVisit = (isActive: boolean) => {
  const { user } = useAuthStore();

  return useQuery<IVisit[], Error>({
    queryKey: [
      "visitList",
      { isActive: isActive, companyId: user?.companyId },
    ],
    queryFn: getVisitList,
  });
};

export default useVisit;
