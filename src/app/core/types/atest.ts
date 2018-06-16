export class Atest {
  id: number;
  title: string;
  desc: string;
  file: string|any;

  constructor(id: number, title: string, desc: string, file: string|any) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.file = file;
  }
}
