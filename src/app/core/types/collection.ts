export class Collection {
  id: number;
  title: string;
  image: string;
  imageUrl: string;
  imageCrop: string;
  parentId: number;
  categoryId: number;

  constructor(id: number, title: string, image: string, imageUrl: string,
    imageCrop: string, parentId: number, categoryId: number) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
    this.parentId = parentId;
    this.categoryId = categoryId;

  }
}
