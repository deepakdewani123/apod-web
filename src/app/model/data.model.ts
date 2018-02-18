export class NasaData {
  title: string;
  explanation: string;
  date: string;
  fileName: string;
  hdFileName: string;
  copyright: string;
  url: string;
  hdurl: string;
  imageLoaded: boolean;
  isSaved: boolean;
  hdImageLoaded: boolean;
  isFav: boolean;
  localUrl: string;
  localHDUrl: string;
  isImageDownloaded: boolean;
  type: string;

  constructor(obj?: any) {
    this.title = (obj && obj.title) || "";
    this.explanation = (obj && obj.explanation) || "";
    this.date = (obj && obj.date) || new Date().toString();
    this.fileName = (obj && obj.fileName) || "";
    this.hdFileName = (obj && obj.hdFileName) || "";
    this.copyright = (obj && obj.copyright) || "";
    this.url = (obj && obj.url) || "";
    this.localHDUrl = (obj && obj.localHDUrl) || "";
    this.hdurl = (obj && obj.hdurl) || "";
    this.imageLoaded = (obj && obj.imageLoaded) || false;
    this.isSaved = (obj && obj.isSaved) || false;
    this.hdImageLoaded = (obj && obj.hdImageLoaded) || false;
    this.isFav = (obj && obj.isFav) || false;
    this.localUrl = (obj && obj.localUrl) || "";
    this.isImageDownloaded = (obj && obj.isImageDownloaded) || false;
    this.type = (obj && obj.type) || "";
  }
}
