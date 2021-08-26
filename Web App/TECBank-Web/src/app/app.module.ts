import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MistarjetasComponent } from './pages/mistarjetas/mistarjetas.component';
import { MiscuentasComponent } from './pages/miscuentas/miscuentas.component';
import { AsesoresComponent } from './pages/asesores/asesores.component';
import { MisprestamosComponent } from './pages/misprestamos/misprestamos.component';
import { MoraComponent } from './pages/mora/mora.component';
import { TarjetasComponent } from './pages/tarjetas/tarjetas.component';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CuentasComponent,
    PrestamosComponent,
    RolesComponent,
    ClientesComponent,
    MistarjetasComponent,
    MiscuentasComponent,
    AsesoresComponent,
    MisprestamosComponent,
    MoraComponent,
    TarjetasComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
