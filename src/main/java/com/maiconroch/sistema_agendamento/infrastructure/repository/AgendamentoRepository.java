package com.maiconroch.sistema_agendamento.infrastructure.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maiconroch.sistema_agendamento.infrastructure.model.Agendamentos;

import jakarta.transaction.Transactional;

public interface AgendamentoRepository extends JpaRepository<Agendamentos, Long> {

	// Buscar horarios reservados de um profissional
	List<Agendamentos> findByProfissionalAndDataHoraAgendamentoBetween(String profissional, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Buscar horarios reservados de um cliente
	List<Agendamentos> findByClienteAndDataHoraAgendamentoBetween(String servico, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Buscar horarios reservados entre intervalo de tempo
	List<Agendamentos> findByDataHoraAgendamentoBetween(LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Servico entre dois intervalo de tempo
	List<Agendamentos> findByServicoAndDataHoraAgendamentoBetween(String servico, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Deletar horario de um cliente
	@Transactional
	void deleteByClienteAndDataHoraAgendamento(String cliente, LocalDateTime dataHoraAgendamento);
}
