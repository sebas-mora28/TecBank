import { Component, OnInit, Output , EventEmitter,Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})


/**
 * Este componente se encarga de mostrar y recibir toda la informacion necesaria 
 * para agragar una nueva entrada o editar alguno de los objetos de la base de datos
 * muestra las barras para llenar la informacion y la emite al API para que sea manejada. 
 */
export class AddItemComponent implements OnInit {
  @Output() onAddItem: EventEmitter<any> = new EventEmitter();
  @Output() onEditItem: EventEmitter<any> = new EventEmitter();
  nombre_Completo: string;
  rol: string;
  numero_cuenta: string;
  numero_de_tarjeta: string;
  
  descripcion: string;
  cedula: string;
  direccion: string;
  telefonos: string[];
  ingreso: string;
  tipo_de_cliente: string;
  tipo_de_tarjeta: string;
  tipo_de_cuenta: string;
  username: string;
  password: string;
  moneda: string;
  owner: string;
  expira: string;
  codigo: string;
  credito: string;
  saldo:string;

  in_roles = false;
  in_clientes = false;
  in_cuentas = false;
  in_tarjetas = false;


  showAddItem: boolean;
  showEditItem: boolean;
  subscrition: Subscription;
  subscrition2: Subscription;
  @Input() url: string;


  in_url:number;

  new_item:any;

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
    this.subscrition = this.uiService.onToggleAdd().subscribe((value)=>(this.showAddItem = value));
    this.subscrition2 = this.uiService.onToggleEdit().subscribe((value)=>(this.showEditItem = value));
    
  }


  /**
   * Esta funcion se ejecuta cuando el boton de enviar a base de datos es oprimido
   * envia la informacion que el usuario haya introducido, con el formato correcto dependiendo del
   * url donde se encuentre
   * 
   * @returns Void
   * 
   */
  onSubmit(){

    switch (this.url) {
      case "/roles":
        if(!this.rol){
          alert("Por favor indique un nombre");
          return;
        }
        if(!this.descripcion){
          alert("Por favor indique una descripcion");
          return;
        }
    
        this.new_item = {
          nombre: this.rol,
          descripcion:this.descripcion,
        }

    
        this.rol = '';
        this.descripcion = '';
        
        break;
      
      case "/clientes":
        if(!this.nombre_Completo){
          alert("Por favor indique un nombre");
          return;
        }
        if(!this.cedula){
          alert("Por favor indique una c??dula");
          return;
        }
        if(!this.direccion){
          alert("Por favor indique una direcci??n");
          return;
        }
        if(!this.telefonos){
          alert("Por favor indique un tel??fono");
          return;
        }
        if(!this.ingreso){
          alert("Por favor indique un ingreso mensual");
          return;
        }
        if(!this.tipo_de_cliente){
          alert("Por favor indique un tipo de cliente");
          return;
        }
        if(!this.username){
          alert("Por favor indique un usuario");
          return;
        }
        if(!this.password){
          alert("Por favor indique un password");
          return;
        }    
    
        this.new_item = {
          Nombre_Completo:this.nombre_Completo,
          Cedula:this.cedula,
          Direccion:this.direccion,
          Telefonos:[this.telefonos],
          Ingreso_Mensual:this.ingreso,
          Tipo_de_cliente:this.tipo_de_cliente,
          Usuario:this.username,
          Password:this.password,
        }

        this.nombre_Completo = "";
        this.cedula = "";
        this.direccion = "";
        this.telefonos = [""];
        this.ingreso = "";
        this.tipo_de_cliente = "";
        this.password = "";
        this.username = "";
        
        break;


      case "/cuentas":
        if(!this.numero_cuenta){
          alert("Por favor indique un n??mero de cuenta");
          return;
        }
        if(!this.descripcion){
          alert("Por favor indique una descripci??n");
          return;
        }
        if(!this.moneda){
          alert("Por favor indique una moneda");
          return;
        }
        if(!this.owner){
          alert("Por favor indique la c??dula del due??o");
          return;
        }
        if(!this.tipo_de_cuenta){
          alert("Por favor indique un tipo de cuenta");
          return;
        }
        if(!this.saldo){
          alert("Por favor indique un saldo");
          return;
        }
    
        this.new_item = {

          numero_Cuenta : this.numero_cuenta,
          descripcion:this.descripcion,
          moneda:this.moneda,
          tipo:this.tipo_de_cuenta,
          cedula_Propietario:this.owner,
          saldo:this.saldo 

        }

        this.numero_cuenta="";
        this.descripcion="";
        this.moneda="";
        this.tipo_de_cuenta="";
        this.owner="";
        this.saldo="";
        
        
        break;
    
      default:
        break;
    }
    if (this.showEditItem) {
      this.onEditItem.emit(this.new_item);
      this.uiService.cancelEdit();
    }
    else{
      this.onAddItem.emit(this.new_item);
      this.uiService.toggleAddItem();
    }

  }

}
