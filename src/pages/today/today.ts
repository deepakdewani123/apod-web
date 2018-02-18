import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";

import {
  IonicPage,
  NavParams,
  ModalController,
  Platform
} from "ionic-angular";

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import * as moment from "moment";

import { ImageViewPage } from "./../image-view/image-view";
import { DataService } from "../../app/services/data.service";
import { NasaData } from "../../app/model/data.model";


@IonicPage()
@Component({
  selector: "page-today",
  templateUrl: "today.html"
})
export class TodayPage {
  nasaData: NasaData;
  platformName: string;
  savedImageUrl: string;
  date: string;
  imgUrl: string;
  imageShareUrl: string;
  isMobile: boolean;
  isDesktop: boolean;

  constructor(
    public navParams: NavParams,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private storage: Storage,
    private transfer: FileTransfer,
    private file: File
  ) {
    this.nasaData = new NasaData();
    this.platformName = this.platform.is("ios") === true ? "ios" : "android";
    this.savedImageUrl = "";
    this.date = "";
    this.imgUrl = "";
    this.imageShareUrl = "";
    this.isMobile = this.platform.is('mobile') || this.platform.is('mobileweb');
    this.isDesktop = this.platform.is('core');
  }

  ionViewDidLoad() {
    this.loadData();

  }

  ionViewWillEnter() {
  }

  loadData() {
    const todayDate = moment().format("YYYY-MM-DD");
    const currentHour = moment();
    const startTime = moment().hour(11);

    this.storage.get("todayData").then((data: NasaData) => {
      if (data.title !== '') {
        if (currentHour.isAfter(startTime) && data.date !== todayDate) {
          this.getTodayData();
        } else {
          this.nasaData = data;
          this.imgUrl = this.nasaData.url;
        }
      } else {
        this.getTodayData();
      }
    });
  }

  getTodayData() {
    console.log('getting data from server');
    this.dataService.getTodayData().subscribe(
      (result) => {
        this.nasaData = new NasaData({
          title: result.title,
          explanation: result.explanation,
          date: result.date,
          fileName: this.createFileName(result.date),
          hdFileName: this.createFileName(result.date),
          copyright: result.copyright,
          url: result.url,
          localHDUrl: "",
          hdurl: result.hdurl,
          imageLoaded: false,
          isSaved: false,
          hdImageLoaded: false,
          isFav: false,
          localUrl: "",
          type: result.url.match(/youtube/) ? "unknown" : "jpg"
        });

        this.imgUrl = result.url;
        this.storage.set("todayData", this.nasaData);
        // if (this.nasaData.type === "jpg") {
        //   this.download(result.url, this.nasaData.fileName);
        // }

      },
      error => {
        console.log(error);
      }
    );

  }

  extension(url) {
    // Remove everything to the last slash in URL
    url = url.substr(1 + url.lastIndexOf("/"));

    // Break URL at ? and take first part (file name, extension)
    url = url.split(".")[0];

    // Now we have only extension
    return url;
  }



  openImageView() {
    let modal = this.modalCtrl.create(
      ImageViewPage,
      {
        data: this.nasaData,
        category: "today"
      },
      {
        // enterAnimation: "modal-scale-up-enter",
        // leaveAnimation: "modal-scale-up-leave"
      }
    );
    modal.present();
  }


  openInNewTab(url: string) {

  }
  private createFileName(date: string) {
    let newFileName = date + ".jpg";
    return newFileName;
  }

  private download(url: string, fileName: string) {
    console.log('download');
    console.log(this.file.dataDirectory);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file + fileName).then(
      entry => {

        this.nasaData.fileName = fileName;
        this.nasaData.isImageDownloaded = true;
        // this.imgUrl = normalizeURL(entry.toURL());

        console.log(entry.toURL());
        this.storage.set("todayData", this.nasaData);
      },
      error => {
        // handle error
        console.log('error');
        this.dataService.presentToast(
          "The image couldn't be downloaded. Please try again."
        );
      }
    );
  }

}
