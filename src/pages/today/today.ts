import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { DomSanitizer } from '@angular/platform-browser';

import {
  IonicPage,
  NavParams,
  ModalController,
  Platform
} from "ionic-angular";

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
  imgUrl: any;
  imageShareUrl: string;
  isMobile: boolean;
  isDesktop: boolean;

  constructor(
    public navParams: NavParams,
    private dataService: DataService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private storage: Storage,
    private sanitizer: DomSanitizer
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

        if (this.nasaData.type === "jpg") {
          this.imgUrl = result.url;
        } else {
          this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(result.url);
        }

        console.log(this.imgUrl);
        this.storage.set("todayData", this.nasaData);
      },
      error => {
        console.log(error);
      }
    );

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

  private createFileName(date: string) {
    let newFileName = date + ".jpg";
    return newFileName;
  }


}
