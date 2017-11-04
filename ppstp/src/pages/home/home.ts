import { PopoverPage } from '../popover/popover';
import { PerfilPage } from '../perfil/perfil';
import { usuario } from "../../clases/usuario";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {} as usuario; 

  constructor(
    public navCtrl:     NavController,
    public navParams:   NavParams,
    public popoverCtrl: PopoverController
  ) {

    this.user.mail = this.navParams.get('mail');
    this.user.password = this.navParams.get('pass');
    

   console.log(this.user.mail +"  -  "+ this.user.password);

  }

  irPerfil()
  {
    this.navCtrl.push(PerfilPage, {
      mail: this.user.mail,
      pass: this.user.password
      
    });
  }

  /*menuPopover(myEvent) {
    let popover = this.popoverCtrl.create("");
    popover.present({
      ev: myEvent
    });
  }*/

}
