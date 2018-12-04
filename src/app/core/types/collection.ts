export class Collection {
  id: number;
  title: string;
  image: string;
  imageUrl: string;
  imageCrop: string;
  imageCropUrl: string;
  imageExtension: string;
  categoryId: number;

  constructor(id: number, title: string, image: string, imageUrl: string,
    imageCrop: string, imageCropUrl: string, imageExtension: string, categoryId: number) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
    this.imageCropUrl = imageCropUrl;
    this.imageExtension = imageExtension;
    this.categoryId = categoryId;

  }
}
