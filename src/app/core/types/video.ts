export class Video {
  id: number;
  title: string;
  image: string;
  url: string|any;
  imageUrl: string;
  imageCrop: string;

  constructor(id: number, title: string, image: string, url: string, imageUrl: string, imageCrop: string) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.url = url;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
  }
}
