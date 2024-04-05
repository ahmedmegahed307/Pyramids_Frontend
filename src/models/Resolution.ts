import { EntityBase } from "./EntityBase";

export class Resolution extends EntityBase {
  name?: string;
  companyId?: number;
  constructor(
    id: number = 0,
    createdAt: Date = new Date(),
    isDeleted: boolean = false,
    isActive: boolean = true,
    createdByUserId: number,
    name?: string
  ) {
    super(id, createdAt, isDeleted, isActive, createdByUserId);

    this.name = name;
    this.companyId = 0;
  }
}

export default Resolution;
