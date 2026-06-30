package com.maiconroch.sistema_agendamento.infrastructure.model;

import java.time.LocalDateTime;

import com.maiconroch.sistema_agendamento.infrastructure.enums.TipoUsuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name ="usuarios")
public class Usuarios {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 150)
	private String nome;
	
	@Column(nullable = false, length = 150)
	private String email;
	
	@Column(nullable = false, length = 255)
	private String senha;
	
	@Column(length = 20)
	private String telefone;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TipoUsuario tipo;
	
	@Column(name = "foto_perfil", columnDefinition = "TEXT")
	private String fotoPerfil;
	
	private Boolean status = true;

	@Column(name = "criado_em")
	private LocalDateTime criadoEm = LocalDateTime.now();

	@Column(name = "atualizado_em")
	private LocalDateTime atualizadoEm = LocalDateTime.now();
	
	@PreUpdate
    public void atualizarData() {
        this.atualizadoEm = LocalDateTime.now();
    }
}
