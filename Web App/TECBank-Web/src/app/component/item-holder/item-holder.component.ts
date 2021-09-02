import { Component, OnInit,Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Router} from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-item-holder',
  templateUrl: './item-holder.component.html',
  styleUrls: ['./item-holder.component.css']
})
export class ItemHolderComponent implements OnInit {

  titulo:String;
  url:String;
  items: any[];
  suscription: Subscription;
  showAddItem:boolean;
  showEditItem: boolean;
  current_item_name:string;
  current_item_number_c:string;
  current_item_number_t:string;
  current_item_c_name:string;

  constructor(private apiService: ApiService , private router:Router, private uiService : UiService) { }

  ngOnInit(): void {
    this.suscription = this.uiService.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    this.suscription = this.uiService.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.url = this.router.url;
    switch (this.router.url) {
      case "/roles":
        this.apiService.get_roles().subscribe((roles) => this.items = roles);
        this.titulo = "Sistema de Gestión de Roles";
        break;
      case "/clientes":
        this.apiService.get_clientes().subscribe((clientes) => this.items = clientes);
        this.titulo = "Sistema de Gestión de Clientes";
        break;
      case "/cuentas":
        this.apiService.get_cuentas().subscribe((cuentas) => this.items = cuentas);
        this.titulo = "Sistema de Gestión de Cuentas";
        break;
      case "/tarjetas":
        this.apiService.get_tarjetas().subscribe((tarjetas) => this.items = tarjetas);
        this.titulo = "Sistema de Gestión de Tarjetas";
        break;
    
      default:
        break;
    }
  }

  toggleAddItem(){
    this.uiService.toggleAddItem();
  }

  add_item(item:any){
    this.apiService.post(item).subscribe((i: any)=> (this.items.push(i)));
  }

  editItemClicked(item:any){
    this.uiService.toggleEditItem();
    this.apiService.editing(item);
    this.current_item_c_name = item.nombre_Completo;
    this.current_item_name = item.nombre;
    this.current_item_number_c = item.numero_Cuenta;
    this.current_item_number_t = item.numero_de_tarjeta;
  }

  cancelEditItem(){
    this.uiService.cancelEdit();
  }

  edit_item(item:any){

    switch (this.router.url) {
      case "/roles":
        this.apiService.put(item).subscribe(()=> {
          this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)
          this.items.push(item)
          });
        break;

      case "/clientes":
        this.apiService.put(item).subscribe(()=> {
          this.items = this.items.filter(i => i.cedula !== this.apiService.current_item.cedula)
          this.items.push(item)
        });
        break;

      case "/cuentas":
        this.apiService.put(item).subscribe(()=> {
          this.items = this.items.filter(i => i.numero_Cuenta !== this.apiService.current_item.numero_Cuenta)
          console.log(item)
          this.items.push(item)
          console.log(this.items)
        });
        break;

      case "/tarjetas":
        this.apiService.put(item).subscribe(()=> {
          this.items = this.items.filter(i => i.numero_de_tarjeta !== this.apiService.current_item.numero_de_tarjeta)
          this.items.push(item)});
        break;
    
      default:
        break;
    }
    
  }

  deleteItem(){
    this.uiService.cancelEdit();

    switch (this.router.url) {
      case "/roles":
        this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre !== this.apiService.current_item.nombre)));
        break;

      case "/clientes":
        this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.nombre_Completo !== this.apiService.current_item.nombre_Completo)));
        break;
      case "/cuentas":
        this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.numero_Cuenta !== this.apiService.current_item.numero_Cuenta)));
        break;
      case "/tarjetas":
        this.apiService.delete().subscribe(() => (this.items = this.items.filter(i => i.numero_de_tarjeta !== this.apiService.current_item.numero_de_tarjeta)));
        break;
    
      default:
        break;
    }
  }

}
