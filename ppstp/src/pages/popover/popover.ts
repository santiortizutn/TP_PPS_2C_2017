import { PerfilPage } from '../perfil/perfil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(
    public navCtrl:   NavController, 
    public navParams: NavParams,
    public viewCtrl:  ViewController,
    public modalCtrl: ModalController
  ) {
    
  }

    perfil()
    {
      this.navCtrl.push(PerfilPage);
    }

    close() {
      this.viewCtrl.dismiss();
    }

  ionViewDidLoad() {
    
  }

}
