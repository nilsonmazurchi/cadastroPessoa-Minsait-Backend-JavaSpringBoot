import { Pessoa } from './../../models/pessoa';
import { Component } from '@angular/core';
import { PessoaService } from '../../pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-edicao',
  templateUrl: './pessoa-edicao.component.html',
  styleUrls: ['./pessoa-edicao.component.scss']
})
export class PessoaEdicaoComponent {
  // Inicializa o objeto pessoa com valores padrão
  pessoa: Pessoa = {
    id: 0,
    nome: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: ''
  };

  // Variável para armazenar o ID da pessoa a ser editada
  id!: number;

  // Construtor para injeção de dependências
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pessoaService: PessoaService
  ) {}
  // Método ngOnInit para carregar os dados da pessoa ao inicializar o componente
  ngOnInit() {
    // Obtém o ID da pessoa a partir dos parâmetros da rota
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // Chama o serviço para buscar a pessoa pelo ID
    this.pessoaService.getPessoaById(this.id).subscribe({
      next: (dados) => {
        this.pessoa = dados;  // Atualiza o objeto pessoa com os dados recebidos do backend
      },
      error: () => {
        alert('Erro ao carregar os dados da pessoa.');
        this.router.navigate(['/']); // Redireciona para a página inicial em caso de erro
      }
    });
  }

  // Método para salvar as edições realizadas na pessoa
  salvarEdicao() {
    this.pessoaService.updatePessoa(this.id, this.pessoa).subscribe(() => {
      alert('Pessoa atualizada com sucesso!');
      this.router.navigate(['/listagem']);
    });
  }

  // Método para buscar dados do endereço com base no CEP informado
  buscarEnderecoPorCep() {
    const cepFormatado = this.pessoa.cep.replace(/\D/g, ''); // Remover não numéricos

    if (cepFormatado.length === 8) { // Verificar se tem 8 dígitos
      this.pessoaService.buscarEnderecoPorCep(cepFormatado).subscribe({
        next: (dados:{ logradouro: string; bairro: string; localidade: string; uf: string }) => {
          if (dados.logradouro) {
            this.pessoa.endereco = dados.logradouro;
            this.pessoa.bairro = dados.bairro;
            this.pessoa.cidade = dados.localidade;
            this.pessoa.uf = dados.uf;
          } else {
            alert('Dados do CEP não encontrados ou inválidos.');
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar dados do CEP:', erro);
          alert('Erro ao buscar dados do CEP. Tente novamente.');
        }
      });
    } else if (cepFormatado.length > 0) { // Verifica se o CEP tem qualquer tamanho inválido
      alert('CEP inválido. O CEP deve ter 8 dígitos.');
    }
  }

  // Método para chamar o serviço de buscar dados do CEP a cada alteração no campo
  onCepInput() {
    const cepFormatado = this.pessoa.cep.replace(/\D/g, ''); // Remover não numéricos

    if (cepFormatado.length === 8) { // Verificar se o CEP tem 8 dígitos
      this.pessoaService.buscarEnderecoPorCep(cepFormatado).subscribe({
        next: (dados: { logradouro: string; bairro: string; localidade: string; uf: string }) => {
          if (dados.logradouro) {
            this.pessoa.endereco = dados.logradouro;
            this.pessoa.bairro = dados.bairro;
            this.pessoa.cidade = dados.localidade;
            this.pessoa.uf = dados.uf;
          } else {
            alert('Dados do CEP não encontrados ou inválidos.');
          }
        },
        error: (erro) => {
          console.error('Erro ao buscar dados do CEP:', erro);
          alert('Erro ao buscar dados do CEP. Tente novamente.');
        }
      });
    }
  }

  // Método para redirecionar de volta para a página de listagem
  voltarParaListagem() {
    this.router.navigate(['/listagem']); // Redireciona para a raiz
  }
}
