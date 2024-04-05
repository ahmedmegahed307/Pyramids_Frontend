import { useQuery } from "@tanstack/react-query";
import JobSubType from "../../../models/JobSubType";
import { getAllSubTypesByTypeId } from "../../../services/JobSubTypeService/jobSubTypeService";

const useGetSubTypesByTypeId = (typeId: number) => {
  return useQuery<JobSubType[], Error>(
    ["subTypesByTypeId", { typeId }],
    () => getAllSubTypesByTypeId(typeId)
  );
};

export default useGetSubTypesByTypeId;
