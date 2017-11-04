import { HomePage } from '../home/home';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { usuario } from "../../clases/usuario";
import { perfil } from "../../clases/perfil";
//import { FirebaseObjectObservable , AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { AngularFireAuth, AngularFireAuthProvider, AngularFireAuthModule } from 'angularfire2/auth';
import * as $ from 'jquery';
import * as firebase from 'firebase';



/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  user = {} as usuario;
  perfil = {} as perfil;
  foto = {} as any;
  perfilData: AngularFireObject<perfil>



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private miFbase: AngularFireDatabase,
    private afAuth: AngularFireAuth

  ) {
    this.user.mail = this.navParams.get('mail');
    this.user.password = this.navParams.get('pass');
    this.perfil.mail = this.user.mail;
    this.perfil.password = this.user.password;
    


    console.log(this.user.mail + "  -  " + this.user.password);
  }

 
obtenerFoto()
{
 /* $("#file").on("change", function(event) {
    this.foto= event.target.files[0];
  });

  var nombreFoto = this.foto.name;
  var storageRef = firebase.storage().ref('/fotos/' + this.perfil.usuario + '/' + nombreFoto);
  storageRef.put(this.foto);
  
  //this.algo =( HTMLInputElement<HTMLElement>.document.getElementById("file")).value;
  console.log("ESTO ES LA FOTO : " + this.foto.name);*/

  this.foto = document.getElementById("file");
  this.foto.addEventListener('change', function(e){

    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('/fotos/' + this.perfil.usuario + '/' + file.name);
    storageRef.put(file);
  
  });
}

  editar() {

    this.obtenerFoto();
    
    this.afAuth.authState.subscribe(auth => {
      this.miFbase.object(`usuarios/${auth.uid}`).set(this.perfil)
        .then(() => this.navCtrl.setRoot(HomePage))
    });
  }

  ionViewDidLoad() {

  }

}
