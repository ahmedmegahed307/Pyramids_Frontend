import Address from "./Address";
import { EntityBase } from "./EntityBase";

export class Company extends EntityBase {
  name: string;
  email?: string;
  phone?: string;
  fax?: string;
  isSendPostWorkSurvey?: boolean;
  isSignatureRequired?: boolean;
  clientPortalUrl?: string;
  logoFileName?: string;
  logoUrl?: string;
  websiteUrl?: string;
  primaryIndustry?: string;
  termsAndConditions?: string;
  vatNumber?: string;
  paymentTerm?: string;
  currency?: string;
  taxable?: boolean;
  normalWorkingHours?: string;
  normalHourlyRate?: number;
  overTimeWorkingHours?: string;
  overtimeHourlyRate?: number;
  address?:Address ;

  constructor(
    name: string,
    email?: string,
    phone?: string,
    fax?: string,
    isSendPostWorkSurvey?: boolean,
    isSignatureRequired?: boolean,
    clientPortalUrl?: string,
    logoFileName?: string,
    websiteUrl?: string,
    primaryIndustry?: string,
    termsAndConditions?: string,
    vatNumber?: string,
    paymentTerm?: string,
    currency?: string,
    taxable?: boolean,
    normalWorkingHours?: string,
    normalHourlyRate?: number,
    overTimeWorkingHours?: string,
    overtimeHourlyRate?: number
  ) {
    super();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.fax = fax;
    this.isSendPostWorkSurvey = isSendPostWorkSurvey;
    this.isSignatureRequired = isSignatureRequired;
    this.clientPortalUrl = clientPortalUrl;
    this.logoFileName = logoFileName;
    this.websiteUrl = websiteUrl;
    this.primaryIndustry = primaryIndustry;
    this.termsAndConditions = termsAndConditions;
    this.vatNumber = vatNumber;
    this.paymentTerm = paymentTerm;
    this.currency = currency;
    this.taxable = taxable;
    this.normalWorkingHours = normalWorkingHours;
    this.normalHourlyRate = normalHourlyRate;
    this.overTimeWorkingHours = overTimeWorkingHours;
    this.overtimeHourlyRate = overtimeHourlyRate;
  }
}

export default Company;
