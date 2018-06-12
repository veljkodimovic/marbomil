export class Category {
  id: number;
  title: string;
  image: string;
  imageUrl: string;
  imageCrop: string;

  constructor(id: number, title: string, image: string, imageUrl: string, imageCrop: string) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
  }
}
