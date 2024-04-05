import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../Authentication/store";
import Address from "../../../../models/Address";
import { getAllAddresses } from "../../../../services/AddressService/addressService";


const useAddress = () => {
  const { user } = useAuthStore();

  return useQuery<Address[], Error>({
    queryKey: [
      "addressList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllAddresses,
  });
};

export default useAddress;
