export class Catalogue {
  id: number;
  title: string;
  desc: string;
  version: string;
  file: string|any;
  fileUrl: string;
  fileExtension: string;

  constructor(id: number, title: string, desc: string, version: string, file: string|any, fileUrl: string, fileExtension: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.version = version;
    this.file = file;
    this.fileUrl = fileUrl;
    this.fileExtension = fileExtension;
  }
}
