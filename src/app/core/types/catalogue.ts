export class Catalogue {
  id: number;
  title: string;
  desc: string;
  version: string;
  file: string|any;

  constructor(id: number, title: string, desc: string, version: string, file: string|any) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.version = version;
    this.file = file;
  }
}
