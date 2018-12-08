export class Atest {
  id: number;
  title: string;
  description: string;
  file: string|any;
  fileUrl: string;
  fileExtension: string;

  constructor(id: number, title: string, description: string, file: string|any, fileUrl: string, fileExtension: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.file = file;
    this.fileUrl = fileUrl;
    this.fileExtension = fileExtension;
  }
}
