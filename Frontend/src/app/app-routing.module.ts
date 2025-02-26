import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PessoaCadastroComponent } from './component/pessoa-cadastro/pessoa-cadastro.component';
import { PessoaListaComponent } from './component/pessoa-lista/pessoa-lista.component';
import { PessoaEdicaoComponent } from './component/pessoa-edicao/pessoa-edicao.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Rota para a página principal
  { path: 'cadastro', component: PessoaCadastroComponent },  // Rota para cadastro
  { path: 'listagem', component: PessoaListaComponent },  // Rota para listagem
  { path: 'edicao/:id', component: PessoaEdicaoComponent },  // Rota para edição

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
