export class Collection {
  id: number;
  title: string;
  image: string;
  imageUrl: string;
  imageCrop: string;
  imageCropUrl: string;
  imageExtension: string;
  parentCollectionId: number;
  categoryId: number;

  constructor(id: number, title: string, image: string, imageUrl: string,
    imageCrop: string, imageCropUrl: string, imageExtension: string, parentCollectionId: number, categoryId: number) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
    this.imageCropUrl = imageCropUrl;
    this.imageExtension = imageExtension;
    this.parentCollectionId = parentCollectionId;
    this.categoryId = categoryId;

  }
}
