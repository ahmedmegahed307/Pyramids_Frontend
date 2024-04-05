import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ICompanyLogo } from "../../../../models/Interfaces/ICompanyLogo";
import { updateCompanyLogo } from "../../../../services/CompanyService/companyService";


const useCompanyLogoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseData, Error, ICompanyLogo >(
    async (companyLogo: ICompanyLogo ): Promise<ResponseData> => {
     
        const id = (companyLogo as ICompanyLogo).companyId;
        return await updateCompanyLogo(id,companyLogo.logo);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["companyById"],
        });

        Swal.fire({
          title: "Success",
          text: 
             "Logo has been updated successfully!"
            ,
          icon: "success",
        });
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

export default useCompanyLogoMutation;
