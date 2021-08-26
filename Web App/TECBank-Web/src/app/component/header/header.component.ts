import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url:string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  in_login(route:string){
    return this.router.url != route;
  }


  is_client():boolean{
    this.url = this.router.url;
    if (this.url == "/miscuentas"){
      return true;
    }
    if (this.url == "/mistarjetas"){
      return true;
    }
    if (this.url == "/misprestamos"){
      return true;
    }
    if (this.url == "/mora"){
      return true;
    }
    else{
      return false;
    }
  }

  is_admin():boolean{
    return !this.is_client();
  }

}
