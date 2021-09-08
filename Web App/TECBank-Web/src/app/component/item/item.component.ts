import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

/**
 * Este componente es una abstraccion de un item de la base de datos, posee todos los 
 * atributos posibles para los objetos de la base de datos y los muestra segun 
 * el url donde se encuentre el usuario
 */
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Output() onEditItem: EventEmitter<any> = new EventEmitter()
  faEdit = faEdit;
  in_roles = false;
  in_clientes = false;
  in_cuentas = false;
  in_tarjetas = false;

  constructor(private router:Router) {

    switch (this.router.url) {
      case "/roles":
        this.in_roles = true;
        break;

      case "/clientes":
        this.in_clientes = true;
        break;

      case "/cuentas":
        this.in_cuentas = true;
        break;

      case "/tarjetas":
        this.in_tarjetas = true;
        break;
    
      default:
        break;
    }

   }

  ngOnInit(): void {

  }

  /**
   * Esta funcion se ejecuta cuando a un item especifico se le selecciona la opcion de edicion
   * @param item Emite el item que se esta editando
   */
  onEdit(item:any){
    this.onEditItem.emit(item)
  }

}
