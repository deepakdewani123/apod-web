import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage";

import { HomePage } from '../pages/home/home';
import { TodayPage } from '../pages/today/today';
import { NasaData } from "./model/data.model";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage) {
    platform.ready().then(() => {
      this.setupData();
    });
  }

  private setupData() {
    this.storage.get("dataExists").then(data => {
      if (data) {
        console.log("data exists");
        this.rootPage = TodayPage;
      } else {
        console.log("data doesnt exists");
        this.storage.set("dataExists", true);
        this.storage.set("todayData", new NasaData()).then(_ => {
          console.log('data set');
          this.rootPage = TodayPage;
        });

      }
    });
  }
}

