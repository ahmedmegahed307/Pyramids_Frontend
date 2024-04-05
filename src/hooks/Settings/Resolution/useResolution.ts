import { useQuery } from "@tanstack/react-query";
import Resolution from "../../../models/Resolution";
import { getAllResolutions } from "../../../services/ResolutionService/resolutionService";
import useAuthStore from "../../Authentication/store";

const useResolution = () => {
  const { user } = useAuthStore();

  return useQuery<Resolution[], Error>({
    queryKey: [
      "resolutionList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllResolutions,
  });
};

export default useResolution;
