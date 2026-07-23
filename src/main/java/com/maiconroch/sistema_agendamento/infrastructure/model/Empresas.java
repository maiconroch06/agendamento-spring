package com.maiconroch.sistema_agendamento.infrastructure.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.maiconroch.sistema_agendamento.infrastructure.enums.StatusAgendamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name="empresas")
public class Empresas {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "usuario_id")
	private Usuarios dono;
	
	@Column(nullable = false, length = 150)
	private String nome;
	
	@Column(nullable = false, length = 20)
	private String cnpj;
	
	@Column(name = "telefone_corporativo", length = 20)
	private String telefoneCorporativo;
	
	@Column(name = "email_corporativo", length = 150)
	private String emailCorporativo;
	
	@Column(columnDefinition = "TEXT")
	private String logo;
		
	@Column(name = "atualizado_em")
	private LocalDateTime atualizadoEm = LocalDateTime.now();
	
	@PreUpdate
    public void atualizarData() {
        this.atualizadoEm = LocalDateTime.now();
    }
	/* // implementação futura

	@Column(length = 10)
	private String cep;
	
	@Column(length = 255)
	private String endereco;
	
	@Column(length = 20)
	private String numero;

	@Column(length = 100)
	private String bairro;
	
	@Column(length = 100)
	private String cidade;
	
	@Column(length = 50)
	private String estado;

    */
}
