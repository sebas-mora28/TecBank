import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-miscuentas',
  templateUrl: './miscuentas.component.html',
  styleUrls: ['./miscuentas.component.css']
})
export class MiscuentasComponent implements OnInit {

  nombre:string;
  trans:boolean;
  movs:boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.get_client(this.apiService.current_cedula).subscribe((c:any)=>{this.nombre = c.nombre_Completo});

  }

  show_trans(){
    this.trans = !this.trans
  }

  show_movs(){
    this.movs = !this.movs
  }

}
