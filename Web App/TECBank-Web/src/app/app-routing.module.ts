import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'cuentas',component:CuentasComponent},
  {path: 'prestamos',component:PrestamosComponent},
  {path: 'roles',component:RolesComponent},
  {path: 'clientes',component:ClientesComponent},
  {path: 'mistarjetas',component:MistarjetasComponent},
  {path: 'miscuentas',component:MiscuentasComponent},
  {path: 'asesores',component:AsesoresComponent},
  {path: 'misprestamos',component:MisprestamosComponent},
  {path: 'mora',component:MoraComponent},
  {path: 'tarjetas',component:TarjetasComponent},
  {path: 'about',component:AboutComponent},
  {path: 'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
