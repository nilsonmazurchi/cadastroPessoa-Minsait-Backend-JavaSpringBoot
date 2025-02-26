import { Component, OnInit, Input } from '@angular/core';
import { PessoaService } from '../../pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.scss']
})
export class PessoaListaComponent implements OnInit {
  // Define a lista de pessoas recebida como entrada do componente pai
  @Input() pessoas: Pessoa[] = [];

  // Construtor para injeção de dependências
  constructor(private readonly pessoaService: PessoaService, private readonly router: Router) {}

  // Método ngOnInit chamado ao inicializar o componente
  ngOnInit() {
    this.carregarPessoas();
  }

  // Método para carregar a lista de pessoas do backend
  carregarPessoas() {
    this.pessoaService.getPessoas().subscribe((dados) => {
      this.pessoas = dados;
    });
  }

  // Método para editar uma pessoa, redirecionando para a página de edição
  editarPessoa(id: number) {
    this.router.navigate(['/edicao/', id]);
  }

  // Método para excluir uma pessoa, perguntando se o usuário tem certeza
  excluirPessoa(id: number) {
    if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe(() => {
        this.carregarPessoas(); // Recarrega a lista após a exclusão
      });
    }
  }

  // Método para voltar para a página inicial
  voltarParaHome() {
    this.router.navigate(['/']); // Redireciona para a raiz
  }
}
