import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../Authentication/store";
import { getAllAssetManufacturers } from "../../../../services/AssetService/AssetManufacturerService/assetManufacturerService";
import AssetManufacturer from "../../../../models/AssetManufacturer";


const useAssetManufacturer = () => {
  const { user } = useAuthStore();

  return useQuery<AssetManufacturer[], Error>({
    queryKey: [
      "assetManufacturerList",
      { isActive: true, companyId: user?.companyId },
    ],
    queryFn: getAllAssetManufacturers,
  });
};

export default useAssetManufacturer;
