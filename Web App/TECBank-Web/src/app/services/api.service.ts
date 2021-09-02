import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Cliente } from 'src/interfaces/Cliente';
import { Rol } from 'src/interfaces/Rol';
import { Router } from '@angular/router';
import { Cuenta } from 'src/interfaces/Cuenta';
import { Tarjeta } from 'src/interfaces/Tarjeta';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = '/api/';
  private newUser:Observable<Cliente[]>;
  private roles:Observable<Cliente[]>;
  private current_url: string;
  private item: any;
  current_item: any;

  constructor(private http:HttpClient, private router:Router) { }



  editing(item:any){
    this.current_item = item;
  }


  //        ______________________
  //_______/ GET

  get_users():Observable<Cliente[]>{

    return this.http.get<Cliente[]>(this.apiURL + "cliente");

  }

  get_roles():Observable<Rol[]>{

    return this.http.get<Rol[]>(this.apiURL+"rol");

  }

  get_clientes():Observable<Cliente[]>{

    return this.http.get<any>(this.apiURL+"cliente");

  }

  get_cuentas():Observable<Cuenta[]>{

    return this.http.get<Cuenta[]>(this.apiURL+"cuenta");

  }

  get_tarjetas():Observable<Tarjeta[]>{

    return this.http.get<Tarjeta[]>(this.apiURL+"tarjeta");

  }

   //        ______________________
  //_______/ POST

  post(item:any): Observable<any>{
    switch (this.router.url) {
      case "/roles":
        return this.post_rol(item);
      case "/clientes":
        return this.post_cliente(item);
      case "/cuentas":
        return this.post_cuenta(item);
      case "/tarjetas":
        return this.post_tarjeta(item);
      
    
      default:
        return this.current_item;
        break;
    }

  }
  
  post_rol(rol: Rol): Observable<Rol>{
    return this.http.post<Rol>(this.apiURL + "rol", rol, httpOptions);
  }

  post_cliente(cliente: Cliente): Observable<Cliente>{
    console.log(cliente);
    return this.http.post<Cliente>(this.apiURL + "cliente", cliente, httpOptions);
  }

  post_cuenta(cuenta: Cuenta): Observable<Cuenta>{
    console.log(cuenta);
    return this.http.post<Cuenta>(this.apiURL + "cuenta", cuenta, httpOptions);
  }

  post_tarjeta(tarjerta: Tarjeta): Observable<Tarjeta>{
    return this.http.post<Tarjeta>(this.apiURL + "tarjeta", tarjerta, httpOptions);
  }

  
   //        ______________________
  //_______/ DELETE


  delete(): Observable<any>{
    switch (this.router.url) {
      case "/roles":
        return this.delete_rol(this.current_item);
      case "/clientes":
        return this.delete_cliente(this.current_item);
      case "/cuentas":
        return this.delete_cuenta(this.current_item);
      case "/tarjeta":
        return this.delete_tarjeta(this.current_item);
    
      default:
        return this.current_item;
        break;
    }

  }

  delete_rol(rol:Rol):Observable<Rol>{

    const url = `${this.apiURL + "rol" }/${rol.nombre}`;
    return this.http.delete<Rol>(url);

  }

  delete_cliente(cliente:Cliente):Observable<Cliente>{

    const url = `${this.apiURL + "cliente" }/${cliente.cedula}`;
    return this.http.delete<Cliente>(url);

  }

  delete_cuenta(cuenta:Cuenta):Observable<Cuenta>{

    console.log(cuenta);
    const url = `${this.apiURL + "cuenta" }/${cuenta.numero_Cuenta}`;
    return this.http.delete<Cuenta>(url);

  }


  delete_tarjeta(tarjeta:Tarjeta):Observable<Tarjeta>{

    const url = `${this.apiURL + "tarjeta" }/${tarjeta.numero_de_tarjeta}`;
    return this.http.delete<Tarjeta>(url);

  }



   //        ______________________
  //_______/ PUT

  put(item:any): Observable<any>{
    switch (this.router.url) {
      case "/roles":
        return this.put_rol(item);

      case "/clientes":
        return this.put_cliente(item);

      case "/cuentas":
        return this.put_cuenta(item);

      case "/tarjetas":
        return this.put_tarjeta(item);
    
      default:
        return this.current_item;
        break;
    }

  }

  put_rol(rol: Rol): Observable<Rol>{
    const url = `${this.apiURL + "rol"}/${this.current_item.nombre}`;
    return this.http.put<Rol>(url,rol,httpOptions);
  }

  put_cliente(cliente: Cliente): Observable<Cliente>{
    const url = `${this.apiURL + "cliente"}/${this.current_item.cedula}`;
    return this.http.put<Cliente>(url,cliente,httpOptions);
  }

  put_cuenta(cuenta: Cuenta): Observable<Cuenta>{
    const url = `${this.apiURL + "cuenta"}/${this.current_item.numero_Cuenta}`;
    return this.http.put<Cuenta>(url,cuenta,httpOptions);
  }

  put_tarjeta(tarjeta: Tarjeta): Observable<Tarjeta>{
    const url = `${this.apiURL + "tarjeta"}/${this.current_item.numero_de_tarjeta}`;
    return this.http.put<Tarjeta>(url,tarjeta,httpOptions);
  }

}
