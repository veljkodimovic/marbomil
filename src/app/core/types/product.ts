export class Product {
  id: number;
  title: string;
  code: string;
  description: string;
  price: number;
  discount: number;
  discountDate: string;
  collectionId: number;
  categoryId: number;
  width: number;
  height: number;
  depth: number;
  numberOnSite: number;
  drawingImage: string;
  drawingImageUrl: string;
  drawingImageExtension: string;
  images: any[];
  newImages: any[];
  updatedImages: any[];
  deletedImages: any[];

  constructor(id: number, title: string, code: string, description: string, price: number, discount: number,
    discountDate: string, collectionId: number, categoryId: number, width: number, height: number,
    numberOnSite: number, depth: number, images: any[], drawingImage: string, drawingImageUrl: string,
    drawingImageExtension: string) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.price = price;
    this.description = description;
    this.discount = discount;
    this.discountDate = discountDate;
    this.collectionId = collectionId;
    this.width = width;
    this.height = height;
    this.numberOnSite = numberOnSite;
    this.depth = depth;
    this.images = images;
    this.drawingImage = drawingImage;
    this.drawingImageUrl = drawingImageUrl;
    this.drawingImageExtension = drawingImageExtension;
    this.categoryId = categoryId;
  }
}
