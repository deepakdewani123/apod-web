import { NasaData } from "./../../app/model/data.model";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  normalizeURL
} from "ionic-angular";
import { Platform } from "ionic-angular";
import { DataService } from "../../app/services/data.service";
import { StatusBar } from "@ionic-native/status-bar";


declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-image-view",
  templateUrl: "image-view.html"
})
export class ImageViewPage {
  data: NasaData;
  imgUrl: string;
  isLoading: boolean;
  isLandscape: boolean;
  orientation: string;
  category: string;
  visibility: string;
  localDirectory: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private dataService: DataService
  ) {
    this.data = this.navParams.get("data");
    this.category = this.navParams.get("category");
    this.localDirectory = "";
    this.imgUrl = "";
    this.isLoading = true;
  }

  ionViewDidLoad() {
    this.imgUrl = this.data.hdurl;
  }

  dismiss() {
    this.navCtrl.pop();
  }

}
