package com.maiconroch.sistema_agendamento.infrastructure.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.maiconroch.sistema_agendamento.infrastructure.enums.StatusAgendamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="agendamentos")
public class Agendamentos {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@ManyToOne
	@JoinColumn(name = "empresa_id", nullable = false)
	private Long empresaId;
	
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Long clienteId;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Long funcionarioId;

    @ManyToOne
    @JoinColumn(name = "servico_id", nullable = false)
    private Long servicoId;
    
    @Enumerated(EnumType.STRING)
    private StatusAgendamento status = StatusAgendamento.PENDENTE;
    
    @Column(name = "valor_total", precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm = LocalDateTime.now();

    @PreUpdate
    public void atualizarData() {
        this.atualizadoEm = LocalDateTime.now();
    }
	
}
