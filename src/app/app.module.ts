import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PesquisarReceitasComponent } from './pesquisar-receitas/pesquisar-receitas.component';
import { ListarReceitasComponent } from './listar-receitas/listar-receitas.component';
import { ReceitasFavoritasComponent } from './receitas-favoritas/receitas-favoritas.component';
import { ReceitaComponent } from './receita/receita.component';
import { ListaReceitasPorLetraComponent } from './lista-receitas-por-letra/lista-receitas-por-letra.component';
import { RattingComponent } from './receita/ratting/ratting.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'pagina-inicial', component: PaginaInicialComponent },
  { path: 'pesquisar-receitas', component: PesquisarReceitasComponent },
  { path: 'listar-receitas', component: ListarReceitasComponent },
  { path: 'receitas-favoritas', component: ReceitasFavoritasComponent },
  { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
  { path: '**', component: PaginaInicialComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaginaInicialComponent,
    PesquisarReceitasComponent,
    ListarReceitasComponent,
    ReceitasFavoritasComponent,
    ReceitaComponent,
    ListaReceitasPorLetraComponent,
    RattingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {
      anchorScrolling: 'enabled',
    }),
    HttpClientModule,
    FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
