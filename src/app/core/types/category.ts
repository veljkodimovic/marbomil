export class Category {
  id: number;
  title: string;
  image: string;
  imageUrl: string;
  imageCrop: string;
  imageCropUrl: string;
  imageExtension: string;

  constructor(id: number, title: string, image: string, imageUrl: string, imageCrop: string,
    imageCropUrl: string, imageExtension: string) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
    this.imageCropUrl = imageCropUrl;
    this.imageExtension = imageExtension;
  }
}
