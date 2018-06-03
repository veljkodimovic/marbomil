export class Banner {
  id: number;
  title: string;
  desc: string;
  image: string;
  url: string;
  imageUrl: string;
  imageCrop: string;

  constructor(id: number, title: string, desc: string, image: string, url: string, imageUrl: string, imageCrop: string) {
    this.id = id;
    this.desc = desc;
    this.title = title;
    this.image = image;
    this.url = url;
    this.imageUrl = imageUrl;
    this.imageCrop = imageCrop;
  }
}
