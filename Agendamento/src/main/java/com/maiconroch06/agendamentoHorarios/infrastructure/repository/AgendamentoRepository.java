package com.maiconroch06.agendamentoHorarios.infrastructure.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maiconroch06.agendamentoHorarios.infrastructure.model.Agendamento;

import jakarta.transaction.Transactional;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

	// Buscar horarios reservados de um profissional
	List<Agendamento> findByProfissionalAndDataHoraAgendamentoBetween(String profissional, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Buscar horarios reservados de um cliente
	List<Agendamento> findByClienteAndDataHoraAgendamentoBetween(String servico, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Buscar horarios reservados entre intervalo de tempo
	List<Agendamento> findByDataHoraAgendamentoBetween(LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Servico entre dois intervalo de tempo
	List<Agendamento> findByServicoAndDataHoraAgendamentoBetween(String servico, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);
	
	// Deletar horario de um cliente
	@Transactional
	void deleteByClienteAndDataHoraAgendamento(String cliente, LocalDateTime dataHoraAgendamento);
}
