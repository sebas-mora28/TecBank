import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BoldReportViewerModule} from '@boldreports/angular-reporting-components'
import { StimulsoftViewerModule } from 'stimulsoft-viewer-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ItemHolderComponent } from './component/item-holder/item-holder.component';
import { ItemComponent } from './component/item/item.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { ButtonComponent } from './component/button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ItemHolderComponent,
    ItemComponent,
    AddItemComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BoldReportViewerModule,
    StimulsoftViewerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
