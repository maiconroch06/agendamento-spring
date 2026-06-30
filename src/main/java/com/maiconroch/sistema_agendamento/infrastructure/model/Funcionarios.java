package com.maiconroch.sistema_agendamento.infrastructure.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="funcionarios")
public class Funcionarios extends Usuarios {

	@Column(name = "empresa_id", nullable = false)
	private Long empresaId;
	
	@Column(length = 150)
	private String especialidade;
	
	// ativo BOOLEAN DEFAULT TRUE,
	
}
