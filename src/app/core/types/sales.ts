export class Sales {
  id: number;
  title: string;
  street: string;
  city: string;
  postal: string;
  region: string;
  country: string;
  latitude: string;
  longitude: string;
  phone: string;
  email: string;
  website: string;

  constructor(id: number, title: string, street: string, city: string, postal: string, region: string, country: string, latitude: string, longitude: string, phone: string, email: string, website: string) {
    this.id = id;
    this.title = title;
    this.street = street;
    this.city = city;
    this.postal = postal;
    this.region = region;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.phone = phone;
    this.email = email;
    this.website = website;
  }
}
