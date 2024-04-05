import { useQuery } from "@tanstack/react-query";
import { getContractById } from "../../services/PPM/PPMService";
import { IContract } from "../../models/Interfaces/IContract";

const useGetContractById = (contractId: number) => {
  return useQuery<IContract, Error>(["contractById", { contractId }], () =>
    getContractById(contractId)
  );
};

export default useGetContractById;
