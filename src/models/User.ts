import { EntityBase } from "./EntityBase";

export class User extends EntityBase {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  initials?: string;
  email?: string;
  phone?: string;
  role?: string;
  userRoleId?: number;
  companyId?: number;
  modifiedDate?: Date | null;
  passwordChangedDate?: Date | null;
  resetPasswordKey?: string | null;
  resetPasswordKeyValidToDate?: Date | null;
  timeZoneId?: number;
  cultureInfoCode?: string | null;
  addressId?: number | null;
  isConfirmed?: boolean;
  confirmationKey?: string | null;
  confirmationDate?: Date | null;
  sessionToken?: string | null;
  sessionTokenDate?: Date | null;
  profilePhotoUrl?: string;

  constructor(
    firstName = "",
    middleName = "",
    lastName = "",
    initials = "",
    email = "",
    phone = "",
    userRoleId = 0,
    role = "",
    companyId = 0,
    createdAt = new Date(),
    modifiedDate: Date | null = null,
    passwordChangedDate: Date | null = null,
    resetPasswordKey: string | null = null,
    resetPasswordKeyValidToDate: Date | null = null,
    timeZoneId = 0,
    cultureInfoCode = "",
    addressId: number | null = null,
    isConfirmed = false,
    confirmationKey: string | null = null,
    confirmationDate: Date | null = null,
    sessionToken: string | null = null,
    sessionTokenDate: Date | null = null,
  ) {
    super();
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.initials = initials;

    this.email = email;
    this.phone = phone;
    this.userRoleId = userRoleId;
    this.role = role;

    this.companyId = companyId;
    this.createdAt = createdAt;
    this.modifiedDate = modifiedDate;
    this.passwordChangedDate = passwordChangedDate;
    this.resetPasswordKey = resetPasswordKey;
    this.resetPasswordKeyValidToDate = resetPasswordKeyValidToDate;
    this.timeZoneId = timeZoneId;
    this.cultureInfoCode = cultureInfoCode;
    this.addressId = addressId;
    this.isConfirmed = isConfirmed;
    this.confirmationKey = confirmationKey;
    this.confirmationDate = confirmationDate;
    this.sessionToken = sessionToken;
    this.sessionTokenDate = sessionTokenDate;
  }
}

export default User;
