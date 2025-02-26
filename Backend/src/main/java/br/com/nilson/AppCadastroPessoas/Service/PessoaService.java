package br.com.nilson.AppCadastroPessoas.Service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.nilson.AppCadastroPessoas.Modelos.*;
import br.com.nilson.AppCadastroPessoas.Repository.*;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository repository;

    public Pessoa cadastrar(Pessoa pessoa) {
        if (pessoa.getId() != null && repository.existsById(pessoa.getId())) {
            Pessoa existente = repository.findById(pessoa.getId()).orElseThrow();
            BeanUtils.copyProperties(pessoa, existente, "id"); // Copia dados sem alterar o ID
            return repository.save(existente);
        } else {
            return repository.saveAndFlush(pessoa);
        }
    }

    public List<Pessoa> listar() {
        return repository.findAll();
    }

    public Optional<Pessoa> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Pessoa atualizar(Long id, Pessoa pessoaAtualizada) {
        Pessoa pessoa = repository.findById(id).orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));
        pessoa.setNome(pessoaAtualizada.getNome());
        pessoa.setCep(pessoaAtualizada.getCep());
        pessoa.setEndereco(pessoaAtualizada.getEndereco());
        pessoa.setNumero(pessoaAtualizada.getNumero());
        pessoa.setComplemento(pessoaAtualizada.getComplemento());
        pessoa.setBairro(pessoaAtualizada.getBairro());
        pessoa.setCidade(pessoaAtualizada.getCidade());
        pessoa.setUf(pessoaAtualizada.getUf());
        return repository.save(pessoa);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
    
    public boolean existePessoa(String nome, String cep, String endereco, String numero) {
        return repository.existsByNomeAndCepAndEndereco(nome, cep, endereco);
    }
}