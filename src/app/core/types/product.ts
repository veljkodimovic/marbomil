export class Product {
  id: number;
  title: string;
  code: string;
  price: number;
  desc: string;
  discount: number;
  discountDate: string;
  collectionId: number;
  categoryId: number;
  widthData: number;
  heightData: number;
  numberOnSite: number;
  depthData: number;
  images: any[];
  newImages: any[];
  updatedImages: any[];
  deletedImages: any[];
  productDrawing: string;

  constructor(id: number, title: string, code: string, desc: string, price: number, discount: number, discountDate: string, collectionId: number, categoryId: number, widthData: number, heightData: number, numberOnSite: number, depthData: number, images: any[], productDrawing: string) {
    this.id = id;
    this.desc = desc;
    this.code = code;
    this.price = price;
    this.desc = desc;
    this.discount = discount;
    this.discountDate = discountDate;
    this.collectionId = collectionId;
    this.widthData = widthData;
    this.heightData = heightData;
    this.numberOnSite = numberOnSite;
    this.depthData = depthData;
    this.images = images;
    this.productDrawing = productDrawing;
  }
}
