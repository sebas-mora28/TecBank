import { Component, OnInit } from '@angular/core';
import { Cliente} from '../../../interfaces/Cliente'
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  is_valid: Boolean;
  all_users: Cliente[];
  cliente: Cliente;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.apiService.get_users().subscribe((users)=>{
      console.log(users);
      this.all_users = users;
    })
  }

  onSubmit(): void {

    if(!this.username){
      alert("Por favor, ingrese su cédula");
      return;
    }
    if(!this.password){
      alert("Por favor, ingrese su contraseña");
      return;
    }

    const user = {
      username: this.username,
      password:this.password,
    }

    this.all_users.forEach((one_user) =>{
      if (user.username == one_user.usuario && user.password == one_user.password){
        this.is_valid = true;
        this.apiService.current_cedula = one_user.cedula;
      }
    });

    this.username = '';
    this.password = ''; 
  
    if (this.is_valid){
      this.router.navigate(['/miscuentas']);
    }
    else if(user.username == "admin"){
      this.router.navigate(['/clientes']);
    }  
    else {
      alert("Usuario o contraseña incorrectos");
    }

  }

}
