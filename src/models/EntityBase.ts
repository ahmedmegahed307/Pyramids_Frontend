export class EntityBase {
  id?: number;
  createdAt?: Date;
  isDeleted?: boolean;
  isActive?: boolean;
  createdByUserId?: number;

  constructor(
    id: number = 0,
    createdAt: Date = new Date(),
    isDeleted: boolean = false,
    isActive: boolean = true,
    createdByUserId: number = 0
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
    this.isActive = isActive;
    this.createdByUserId = createdByUserId;
  }
}
export default EntityBase;
