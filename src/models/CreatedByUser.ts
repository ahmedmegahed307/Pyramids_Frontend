export class CreatedByUser {
  id?: number;
  firstName?: string;
  lastName?: string;

  constructor() {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
  }
}

export default CreatedByUser;
