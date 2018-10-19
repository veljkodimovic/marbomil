export class Atest {
  id: number;
  title: string;
  description: string;
  file: string|any;
  fileExtension: string;

  constructor(id: number, title: string, description: string, file: string|any, fileExtension: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.file = file;
    this.fileExtension = fileExtension;
  }
}
