export class Customer {
    accountNumber: string;
    address: string;
    companyName: string;
    companyRegistrationNumber: string;
    companyTaxIdentificationNumber: string;
    contactPerson: string;
    contactPhoneNumber: string;
    discount: number;
    email: string;
    id: number;
    isActive: boolean;
    username: string;
    password: string;
    website: string;

    constructor(accountNumber: string,
        address: string,
        companyName: string,
        companyRegistrationNumber: string,
        companyTaxIdentificationNumber: string,
        contactPerson: string,
        contactPhoneNumber: string,
        discount: number,
        email: string,
        isActive: boolean,
        username: string,
        password: string,
        website: string) {

        this.accountNumber = accountNumber;
        this.address = address;
        this.companyName = companyName;
        this.companyRegistrationNumber = companyRegistrationNumber;
        this.companyTaxIdentificationNumber = companyTaxIdentificationNumber;
        this.contactPerson = contactPerson;
        this.contactPhoneNumber = contactPhoneNumber;
        this.discount = discount;
        this.email = email;
        this.isActive = isActive;
        this.username = username;
        this.password = password;
        this.website = website;
    }
}
