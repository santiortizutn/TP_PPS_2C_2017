import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthProvider, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { NativeAudio } from '@ionic-native/native-audio';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { usuario } from "../../clases/usuario";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = {} as usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtr: ToastController, public ActCtr: ActionSheetController,
    private aute: AngularFireAuth, private alert: AlertController, public audio: NativeAudio) {
    this.audio.preloadSimple('btn', 'assets/sounds/btn.mp3');

    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(result);
        console.log(user);
        let tost = toastCtr.create({
          message: "espere",
          duration: 3000,
          position: 'middle'
        });
        tost.present();

        if (user != null) {
          navCtrl.setRoot(HomePage, {
            user: user
          });
        }
      }
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      const alerta = alert.create({
        title: 'Error',
        subTitle: errorMessage,
        buttons: ['Dismiss']
      });
      alerta.present();
    });

  }


  async login() {

    this.audio.play('btn');
    if (this.usuario.mail == null || this.usuario.password == null) {
      let tost = this.toastCtr.create({
        message: 'Error, complete los campos',
        duration: 3000,
        position: 'middle'
      });
      tost.present();
    }
    else {
      try {
        var result = this.aute.auth.signInWithEmailAndPassword(this.usuario.mail, this.usuario.password).then(result => {

          this.navCtrl.setRoot(HomePage, {
            mail: this.usuario.mail,
            pass: this.usuario.password
            
          });

        }).catch(error => {
          console.error(error);
          let tost = this.toastCtr.create({
            message: 'Error mostro',
            duration: 3000,
            position: 'middle'
          });
          tost.present();
        });
        {

        }

        console.log(result);
      }
      catch (error) {
        console.error(error);
        let tost = this.toastCtr.create({
          message: error.message,
          duration: 3000,
          position: 'middle'
        });
        tost.present();
      }

    }
  }
  async google() {
    try {
      this.audio.play('btn');
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    } catch (error) {
      let errorMessage = error.message;
      console.error(error);
      const alerta = this.alert.create({
        title: 'Error',
        subTitle: errorMessage,
        buttons: ['Dismiss']
      });
      alerta.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
