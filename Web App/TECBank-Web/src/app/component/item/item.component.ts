import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
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

  onEdit(item:any){
    this.onEditItem.emit(item)
  }

}
