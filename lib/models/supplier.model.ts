export class Supplier {
  supplierId: number;
  uniqueId: number;
  name: string;
  contactPerson: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
  bankDetails?: string;
  paymentTerms?: string;
  creditLimit?: string;
  outstandingBalance?: string;
  category?: string;
  rating?: number;
  reviewText?: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.supplierId = data.supplierId;
    this.uniqueId = data.uniqueId;
    this.name = data.name;
    this.contactPerson = data.contactPerson;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this.gstNumber = data.gstNumber;
    this.bankDetails = data.bankDetails;
    this.paymentTerms = data.paymentTerms;
    this.creditLimit = data.creditLimit;
    this.outstandingBalance = data.outstandingBalance;
    this.category = data.category;
    this.rating = data.rating;
    this.reviewText = data.reviewText;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static fromJsonData(data: any): Supplier {
    return new Supplier(data);
  }
}
