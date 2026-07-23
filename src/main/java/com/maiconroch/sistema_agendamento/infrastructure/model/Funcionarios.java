package com.maiconroch.sistema_agendamento.infrastructure.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.maiconroch.sistema_agendamento.infrastructure.enums.StatusAgendamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name="funcionarios")
public class Funcionarios extends Usuarios {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToMany
    @JoinTable(name = "funcionario_servicos", joinColumns = @JoinColumn(name = "funcionario_id"),
    	inverseJoinColumns = @JoinColumn(name = "servico_id"))
    private List<Servicos> servicos;
	
	@ManyToOne
	@JoinColumn(name = "empresa_id", nullable = false)
	private Empresas empresa;
	
	@Column(length = 150)
	private String especialidade;
	
	private boolean ativo = true;
	
}
