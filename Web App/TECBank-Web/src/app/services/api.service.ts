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


/**
 * Este servicio es el encargado de manejar todos las interacciones con el API. De aqui se emiten los
 * querys HTTP hacia las url indicadas
 */
export class ApiService {
  private apiURL = '/api/';   // Esta ruta corresponde al url del proxy https://localhost:44367
  current_item: any;
  current_cedula: string;

  constructor(private http:HttpClient, private router:Router) { }


  /**
   * Funcion que se ejecuta al comenzar la edicion de un item, almacena los datos del item que se esta editando.
   * @param item el item original
   */
  editing(item:any){
    this.current_item = item;
  }


  //        ______________________
  //_______/ GET

  /**
   * Funcion GET para todos los clientes
   * @returns JSON con todos los clientes
   */
  get_users():Observable<Cliente[]>{

    return this.http.get<Cliente[]>(this.apiURL + "cliente");

  }

   /**
   * Funcion GET para todos los roles
   * @returns JSON con todos los roles
   */
  get_roles():Observable<Rol[]>{

    return this.http.get<Rol[]>(this.apiURL+"rol");

  }

   /**
   * Funcion GET para todos los clientes
   * @returns JSON con todos los clientes
   */
  get_clientes():Observable<Cliente[]>{

    return this.http.get<any>(this.apiURL+"cliente");

  }

   /**
   * Funcion GET para todas las cuentas
   * @returns JSON con todas las cuentas
   */
  get_cuentas():Observable<Cuenta[]>{

    return this.http.get<Cuenta[]>(this.apiURL+"cuenta");

  }

   /**
   * Funcion GET para todas las tarjetas
   * @returns JSON con todas las tarjetas
   */
  get_tarjetas():Observable<Tarjeta[]>{

    return this.http.get<Tarjeta[]>(this.apiURL+"tarjeta");

  }


/**
 * Funcion GET para un unico cliente
 * @param cedula la cedula del cliente a buscar
 * @returns JSON con los datos del cliente que tenga esa cedula
 */
  get_client(cedula:string):Observable<Cliente>{
    console.log(cedula);
    const url = `${this.apiURL + "cliente" }/${cedula}`;
    console.log(url)
    return this.http.get<Cliente>(url)

  }

   //        ______________________
  //_______/ POST

  /**
   * Funcion POST general. Dependiendo del url hace el post especifico
   * @param item Un item de cualquier tipo que contine datos para enviar al API
   * @returns Un observe con la respuesta del API
   */
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
  
  /**
   * Funcion POST para un rol
   * @param rol Un JSON con todos los datos de rol
   * @returns respuesta del API
   */
  post_rol(rol: Rol): Observable<Rol>{
    return this.http.post<Rol>(this.apiURL + "rol", rol, httpOptions);
  }

  
  /**
   * Funcion POST para un cliente
   * @param cliente Un JSON con todos los datos de cliente
   * @returns respuesta del API
   */
  post_cliente(cliente: Cliente): Observable<Cliente>{
    console.log(cliente);
    return this.http.post<Cliente>(this.apiURL + "cliente", cliente, httpOptions);
  }

  /**
   * Funcion POST para una cuenta
   * @param cuenta Un JSON con todos los datos de cuenta
   * @returns respuesta del API
   */
  post_cuenta(cuenta: Cuenta): Observable<Cuenta>{
    console.log(cuenta);
    return this.http.post<Cuenta>(this.apiURL + "cuenta", cuenta, httpOptions);
  }

  
  /**
   * Funcion POST para una tarjeta
   * @param tarjerta Un JSON con todos los datos de tarjeta
   * @returns respuesta del API
   */
  post_tarjeta(tarjerta: Tarjeta): Observable<Tarjeta>{
    return this.http.post<Tarjeta>(this.apiURL + "tarjeta", tarjerta, httpOptions);
  }

  
   //        ______________________
  //_______/ DELETE


  
  /**
   * Funcion DELETE general. Dependiendo del url hace el delete especifico
   * @returns respuesta del API
   */
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

  /**
   * Funcion DELETE para un rol  
   * @param rol rol a eliminar
   * @returns repuesta del API
   */
  delete_rol(rol:Rol):Observable<Rol>{

    const url = `${this.apiURL + "rol" }/${rol.nombre}`;
    return this.http.delete<Rol>(url);

  }

  
  /**
   * Funcion DELETE para un cliente
   * @param cliente cliente a eliminar
   * @returns repuesta del API
   */
  delete_cliente(cliente:Cliente):Observable<Cliente>{

    const url = `${this.apiURL + "cliente" }/${cliente.cedula}`;
    return this.http.delete<Cliente>(url);

  }

  
  /**
   * Funcion DELETE para una cuenta  
   * @param cuenta cuenta a eliminar
   * @returns repuesta del API
   */
  delete_cuenta(cuenta:Cuenta):Observable<Cuenta>{

    console.log(cuenta);
    const url = `${this.apiURL + "cuenta" }/${cuenta.numero_Cuenta}`;
    return this.http.delete<Cuenta>(url);

  }


  /**
   * Funcion DELETE para una tarjeta  
   * @param tarjeta tarjeta a eliminar
   * @returns repuesta del API
   */
  delete_tarjeta(tarjeta:Tarjeta):Observable<Tarjeta>{

    const url = `${this.apiURL + "tarjeta" }/${tarjeta.numero_de_tarjeta}`;
    return this.http.delete<Tarjeta>(url);

  }



   //        ______________________
  //_______/ PUT

  /**
   * Funcion general para PUT de un item. Dependiendo del URL hace un PUT especifico
   * @param item item con las modificaciones a hacer
   * @returns respueta del API
   */
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

  /**
   * Funcion PUT para un rol
   * @param rol los nuevos datos del rol
   * @returns respuesta del API
   */
  put_rol(rol: Rol): Observable<Rol>{
    const url = `${this.apiURL + "rol"}/${this.current_item.nombre}`;
    return this.http.put<Rol>(url,rol,httpOptions);
  }

  /**
   * Funcion PUT para un cliente
   * @param cliente los nuevos datos del cliente
   * @returns respuesta del API
   */
  put_cliente(cliente: Cliente): Observable<Cliente>{
    const url = `${this.apiURL + "cliente"}/${this.current_item.cedula}`;
    return this.http.put<Cliente>(url,cliente,httpOptions);
  }

  /**
   * Funcion PUT para una cuenta
   * @param cuenta los nuevos datos de la cuenta
   * @returns respuesta del API
   */
  put_cuenta(cuenta: Cuenta): Observable<Cuenta>{
    const url = `${this.apiURL + "cuenta"}/${this.current_item.numero_Cuenta}`;
    return this.http.put<Cuenta>(url,cuenta,httpOptions);
  }

  /**
   * Funcion PUT para una tarjeta
   * @param tarjeta los nuevos datos del tarjeta
   * @returns respuesta del API
   */
  put_tarjeta(tarjeta: Tarjeta): Observable<Tarjeta>{
    const url = `${this.apiURL + "tarjeta"}/${this.current_item.numero_de_tarjeta}`;
    return this.http.put<Tarjeta>(url,tarjeta,httpOptions);
  }

}
