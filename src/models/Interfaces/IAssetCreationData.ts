import AssetManufacturer from "../AssetManufacturer";
import AssetModel from "../AssetModel";
import AssetType from "../AssetType";
import Client from "../Client";

export interface IAssetCreationData {
  assetModels: AssetModel[];
  assetTypes: AssetType[];
  assetManufacturers: AssetManufacturer[];
  clients: Client[];
}
