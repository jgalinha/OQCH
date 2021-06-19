import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PesquisarReceitasComponent } from './pesquisar-receitas/pesquisar-receitas.component';
import { ListarReceitasComponent } from './listar-receitas/listar-receitas.component';
import { ReceitasFavoritasComponent } from './receitas-favoritas/receitas-favoritas.component';

const appRoutes: Routes = [
    {path: 'pagina-inicial', component: PaginaInicialComponent},
    {path: 'pesquisar-receitas', component: PesquisarReceitasComponent},
    {path: 'listar-receitas', component: ListarReceitasComponent},
    {path: 'receitas-favoritas', component: ReceitasFavoritasComponent},
    {path: '', redirectTo: 'pagina-inicial', pathMatch: 'full'},
    {path: '**', component: PaginaInicialComponent}
  ];
@NgModule({
  declarations: [AppComponent, HeaderComponent, PaginaInicialComponent, PesquisarReceitasComponent, ListarReceitasComponent, ReceitasFavoritasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
