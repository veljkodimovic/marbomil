export class Video {
  id: number;
  title: string;
  image: string;
  imageCrop: string;
  imageExtension: string;
  imageUrl: string;
  imageCropUrl: string;
  url: string|any;

  constructor(id: number, title: string, image: string, imageCrop: string, imageExtension: string,
    imageUrl: string, imageCropUrl: string, url: string) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.imageCrop = imageCrop;
    this.imageExtension = imageExtension;
    this.imageUrl = imageUrl;
    this.imageCropUrl = imageCropUrl;
    this.url = url;
  }
}
