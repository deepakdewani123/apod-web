import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TodayPage } from "../pages/today/today";
import { ImageViewPage } from "./../pages/image-view/image-view";
import { DataService } from "../app/services/data.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodayPage,
    ImageViewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodayPage,
    ImageViewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    FileTransfer,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
