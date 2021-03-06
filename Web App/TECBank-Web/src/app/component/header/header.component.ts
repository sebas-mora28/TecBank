import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

/**
 * Este componente se encarga de la navegacion dentro de la pagina web
 * cambia botones segun el url donde el usuario se encuentre
 */
export class HeaderComponent implements OnInit {

  url:string;
  notA =true;
  notClts =true;
  notCts=true;
  notRls=true;
  notTjts=true;
  notMt=true;
  notMc=true;
  notMp=true;
  notM=true;
  notPtms=true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Esta funcion indica si se esta en login
   * @param route un string con el url
   * @returns booleano
   */
  in_login(route:string){
    return this.router.url != route;
  }


  /**
   * Esta funcion indica si el usuario esta o no en alguno de los
   * urls asociados a un cliente. Ademas modifica los parametros para
   * manejar el color de los botones en el header
   * @returns boolean
   */
  is_client():boolean{
    this.url = this.router.url;
    if (this.url == "/miscuentas"){

      this.reset();
      this.notMc=false;

      return true;
    }
    if (this.url == "/mistarjetas"){

      this.reset();
      this.notMt=false;

      return true;
    }
    if (this.url == "/misprestamos"){

      this.reset();
      this.notMp=false;

      return true;
    }
    if (this.url == "/mora"){

      this.reset();
      this.notM=false;

      return true;
    }

    if (this.url == "/asesores"){


      this.reset();
      this.notA = false;

      return false;
    }

    if (this.url == "/clientes"){

      this.reset();
      this.notClts =false;


      return false;
    }

    if (this.url == "/cuentas"){

      this.reset();
      this.notCts=false;

      return false;
    }

    if (this.url == "/roles"){

      this.reset();
      this.notRls=false;

      return false;
    }

    if (this.url == "/tarjetas"){

      this.reset();
      this.notTjts=false;

      return false;
    }

    if (this.url == "/prestamos"){

      this.reset();
      this.notPtms=false;

      return false;
    }
    else{
      return false;
    }
  }

  is_admin():boolean{
    return !this.is_client();
  }

  reset(){

      this.notA =true;
      this.notClts =true;
      this.notCts=true;
      this.notRls=true;
      this.notTjts=true;
      this.notMt=true;
      this.notMc=true;
      this.notMp=true;
      this.notM=true;
      this.notPtms=true;

  }

}
