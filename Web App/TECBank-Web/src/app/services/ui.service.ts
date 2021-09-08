import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio especializado para el control de la interfaz. Contiende utilidades para informar a varios 
 * componentes de un cambio y llevar control general de la interfaz
 */
export class UiService {

  private showAddItem : boolean = false;
  private showEditItem : boolean = false;
  private add = new Subject<any>();
  private edit = new Subject<any>();

  constructor() { }

  /**
   * Funcion que define si se muestra el componente add-item
   */
  toggleAddItem(): void {
    this.showAddItem = !this.showAddItem;
    this.add.next(this.showAddItem);
  }

  /**
   * Funcion que retorna el valor booleano que identifica si add-item se muestra o no
   * @returns un observable
   */
  onToggleAdd(): Observable<any> {
    return this.add.asObservable();
  }

  /**
   * Funcion que retorna el valor booleano que identifica si las opciones de edicion de add-item se muestran o no
   * @returns un observable
   */
  onToggleEdit(): Observable<any> {
    return this.edit.asObservable();
  }

  /**
   * Funcion que se ejcuta cuando el boton de edicion es presionado. 
   * Define el valor del booleano que dicat si se muestran o no las opciones de edicion de add-tiem
   */
  toggleEditItem(): void {
    this.showAddItem = true;
    this.add.next(this.showAddItem);
    this.showEditItem = true;
    this.edit.next(this.showEditItem);
  }

  /**
   * Funcion que se ejecuta al presionar cancelar en la ventana de edicion.
   */
  cancelEdit(){
    this.showAddItem = false;
    this.add.next(this.showAddItem);
    this.showEditItem = false;
    this.edit.next(this.showEditItem);

  }


}
