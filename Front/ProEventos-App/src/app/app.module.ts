import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { NavComponent } from './shared/nav/nav.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TituloComponent } from './shared/titulo/titulo.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

<<<<<<< HEAD
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

=======
>>>>>>> f4767879338f911166eba32a5f72fa5945e3fbc6
import { EventoService } from './services/evento.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent,
<<<<<<< HEAD
    DateTimeFormatPipe,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    TituloComponent
=======
    DateTimeFormatPipe
>>>>>>> f4767879338f911166eba32a5f72fa5945e3fbc6
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //add o backend
    BrowserAnimationsModule,

    CollapseModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot(), //precisa importar pra usar a caixa de bananas
    BsDropdownModule.forRoot(),
<<<<<<< HEAD
    ModalModule.forRoot(),

    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),

    NgxSpinnerModule
  ],
  providers: [EventoService], //melhor colocar aqui porque fica facil de ver os componentes
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
=======
    ModalModule.forRoot()
  ],
  providers: [EventoService], //melhor colocar aqui porque fica facil de ver os componentes
  bootstrap: [AppComponent]
>>>>>>> f4767879338f911166eba32a5f72fa5945e3fbc6
})
export class AppModule { }