import { useQuery } from "@tanstack/react-query";
import { getCompanyById } from "../../../services/CompanyService/companyService";
import Company from "../../../models/Company";

const useGetCompanyById = (id: number) => {
  return useQuery<Company, Error>(["companyById", { id }], () =>
    getCompanyById(id)
  );
};

export default useGetCompanyById;
