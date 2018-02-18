import { Injectable } from "@angular/core";
import { normalizeURL, ToastController } from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { NasaData } from "../model/data.model";

interface DataResponse {
  title: string;
  explanation: string;
  date: string;
  copyright: string;
  url: string;
  hdurl: string;
}

@Injectable()
export class DataService {
  baseURL: string;

  constructor(
    private http: Http,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.baseURL = "https://api.nasa.gov/planetary/apod?";
  }

  getTodayData() {

    let url: string;
    url = this.baseURL + "api_key=FvuaAkgkbQNeHku21L2At5gpBmEm4hENxkNNNokg";

    return this.http.get(url).map(
      data => {
        // console.log(data.hdurl);

        // console.log(data);
        return data.json();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }


  // getFileDirectory() {
  //   return normalizeURL(cordova.file.dataDirectory);
  // }

  getData(from: string): Promise<NasaData[]> {
    return this.storage.get(from).then((dataArray: NasaData[]) => {
      return dataArray;
    });
  }

  updateData(from: string, date: string, fileName: string) {
    this.storage.get(from).then((dataArray: NasaData[]) => {
      var index = dataArray.findIndex(function (object) {
        return object.date === date;
      });
      if (index !== -1) {
        dataArray[index].hdFileName = fileName;
        this.storage.set(from, dataArray);
      }
    });
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }
}
