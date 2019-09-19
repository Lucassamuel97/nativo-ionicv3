import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  resp_coords: any;
  latitude: any;
  longitude: any;
  photo: string = '';
  constructor(public navCtrl: NavController, private camera: Camera, private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.resp_coords = resp.coords;
        this.latitude = this.resp_coords.latitude;
        this.longitude = this.resp_coords.longitude;
        console.log(resp);
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição')
        console.log(error);
      });
      
    let watch = this.geolocation.watchPosition();
    watch
      .subscribe((resp) => {
        this.resp_coords = resp.coords;
        this.latitude = this.resp_coords.latitude;
        this.longitude = this.resp_coords.longitude;
      }, (error) => {
        console.log(error);
      });
  }


  takePicture() {
    this.photo = '';
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
