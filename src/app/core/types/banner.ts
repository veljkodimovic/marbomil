export class Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  imageUrl: string;
  imageCrop: string;
  imageExtension: string;

  constructor(id: number, title: string, description: string, image: string, imageUrl: string, imageCrop: string, imageExtension: string) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.image = image;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
    this.imageExtension = imageExtension;
  }
}
