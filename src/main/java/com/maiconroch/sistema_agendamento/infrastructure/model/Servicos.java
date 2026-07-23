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
import jakarta.persistence.ManyToOne;
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
@Table(name="servicos")
public class Servicos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_empresa", nullable = false)
	private Empresas empresa;
	
	@Column(nullable = false, length = 150)
	private String nome;
	
	@Column(columnDefinition = "TEXT")
	private String descricao;
	
	@Column(name = "duracao_minutos", nullable = false)
	private int duracaoMinutos;
	
	@Column(nullable = false, precision = 10, scale = 2)
	private BigDecimal preco;

	private Boolean ativo;
	
	@Column(name = "criado_em")
	private LocalDateTime criadoEm = LocalDateTime.now();

}
