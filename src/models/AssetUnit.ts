export class AssetUnit {
    modelNumber: string;
    serialNumber: string;
    assetUnitTypeId: number;

    constructor(
        modelNumber = "",
        serialNumber = "",
        assetUnitTypeId = 0
    ) {
        this.modelNumber = modelNumber;
        this.serialNumber = serialNumber;
        this.assetUnitTypeId = assetUnitTypeId;
    }
}

export default AssetUnit;
