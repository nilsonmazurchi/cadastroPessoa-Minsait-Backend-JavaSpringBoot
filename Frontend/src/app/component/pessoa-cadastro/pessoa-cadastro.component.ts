import { Component } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from '../../pessoa.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.scss']
})
export class PessoaCadastroComponent {

  // Objeto pessoa inicializado com valores padrão
  pessoa: Pessoa = {
    nome: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: ''
  };

  // Variável de controle para exibição de erros
  submitted = false;

  // Construtor para injeção de dependências
  constructor(private readonly pessoaService: PessoaService, private readonly router: Router) {}

  /**
   * Método para cadastrar uma nova pessoa.
   * Verifica se o formulário é válido antes de enviar os dados.
   * Após o cadastro, limpa o formulário e reseta os erros.
   */
  cadastrarPessoa(form: NgForm) {
    this.submitted = true; // Ativa a exibição das mensagens de erro

    if (form.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.pessoaService.cadastrarPessoa(this.pessoa).subscribe({
      next: () => {
        alert('Pessoa cadastrada com sucesso!');
        // Reseta os campos da pessoa após cadastro bem-sucedido
        this.pessoa = { nome: '', cep: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '' };
        this.submitted = false; // Reseta as mensagens de erro após salvar
        form.resetForm(); // Limpa o formulário
      },
      error: (erro) => {
        alert('Erro ao cadastrar pessoa: ' + erro.error.message);
      }
    });
  }

  /**
   * Método para buscar o endereço automaticamente com base no CEP informado.
   * Valida se o CEP possui 8 dígitos antes de fazer a requisição ao serviço.
   */
  buscarEnderecoPorCep() {
    const cepFormatado = this.pessoa.cep.replace(/\D/g, ''); // Remover não numéricos

    if (cepFormatado.length === 8) { // Verificar se tem 8 dígitos
      this.pessoaService.buscarEnderecoPorCep(cepFormatado).subscribe({
        next: (dados: { logradouro: string; bairro: string; localidade: string; uf: string }) => {
          if (dados.logradouro) {
            // Atualiza os campos do endereço com os dados obtidos
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

  /**
   * Método chamado automaticamente ao digitar no campo de CEP.
   * Faz a busca do endereço quando o CEP atinge 8 dígitos.
   */
  onCepInput() {
    const cepFormatado = this.pessoa.cep.replace(/\D/g, ''); // Remover não numéricos

    if (cepFormatado.length === 8) { // Verificar se o CEP tem 8 dígitos
      this.pessoaService.buscarEnderecoPorCep(cepFormatado).subscribe({
        next: (dados: { logradouro: string; bairro: string; localidade: string; uf: string }) => {
          if (dados.logradouro) {
            // Preenche automaticamente os campos do endereço
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

  /**
   * Redireciona o usuário para a página inicial.
   */
  voltarParaHome() {
    this.router.navigate(['/']); // Redireciona para a raiz
  }

}
