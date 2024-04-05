import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Company from "../../../models/Company";
import {
  deleteCompany,
  updateCompany,
} from "../../../services/CompanyService/companyService";

const useCompanyMutation = (
  onUpdateOrDelete: () => void,
  isUpdate: boolean
) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, Company | number>(
    async (company: Company | number): Promise<ResponseData> => {
      if (isUpdate) {
        const id = (company as Company).id;
        return await updateCompany(id ?? 0, company);
      } else {
        const id = company as number;
        return await deleteCompany(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["companyById"],
        });

        Swal.fire({
          title: "Success",
          text: isUpdate
            ? "Company has been updated successfully!"
            : "Company has been deleted successfully!",
          icon: "success",
        });
        onUpdateOrDelete();
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

export default useCompanyMutation;
