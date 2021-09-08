import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-miscuentas',
  templateUrl: './miscuentas.component.html',
  styleUrls: ['./miscuentas.component.css']
})

/**
 * Esta pagina de cliente muestra algunas de las posibles funcionalidades 
 * que podria tener una aplicacion de este tipo (/miscuentas)
 */
export class MiscuentasComponent implements OnInit {

  nombre:string;
  trans:boolean;
  movs:boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.get_client(this.apiService.current_cedula).subscribe((c:any)=>{this.nombre = c.nombre_Completo});

  }

  /**
   * Funcion auxiliar que controla el estado de la intefaz de transferencias 
   */
  show_trans(){
    this.trans = !this.trans
  }

  /**
   * Funcion auxiliar que controla el estado de la intefaz de movimientos
   */
  show_movs(){
    this.movs = !this.movs
  }

}
