package com.maiconroch.sistema_agendamento.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.maiconroch.sistema_agendamento.infrastructure.model.Agendamento;
import com.maiconroch.sistema_agendamento.infrastructure.repository.AgendamentoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

	private final AgendamentoRepository agendamentoRepository;
	
	public Agendamento salvarAgendamento(Agendamento agendamento) {
		LocalDateTime horaInicio = agendamento.getDataHoraAgendamento();
		LocalDateTime horaFim = agendamento.getDataHoraAgendamento().plusHours(1);
		String profissional = agendamento.getProfissional();
		
		List<Agendamento> agendados = agendamentoRepository.findByProfissionalAndDataHoraAgendamentoBetween(profissional, horaInicio, horaFim);
		
		if (!agendados.isEmpty()) {
			throw new RuntimeException("O horário já está preenchido.");
		}
		
		return agendamentoRepository.save(agendamento);
	}
	
	public List<Agendamento> consultarAgendamentosDia(LocalDate data) {
		LocalDateTime primeiraHoraDia = data.atStartOfDay();
		LocalDateTime segundaHoraDia = data.atTime(23, 59, 59);
		
		return agendamentoRepository.findByDataHoraAgendamentoBetween(primeiraHoraDia, segundaHoraDia);
	}
	
	public List<Agendamento> consultarAgendamentosClienteDia(String cliente, LocalDate data) {
		LocalDateTime primeiraHoraDia = data.atStartOfDay();
		LocalDateTime segundaHoraDia = data.atTime(23, 59, 59);

		return agendamentoRepository.findByClienteAndDataHoraAgendamentoBetween(cliente, primeiraHoraDia, segundaHoraDia);
	}
	
	public List<Agendamento> consultarAgendamentosProfissionalDia(String profissional, LocalDate data) {
		LocalDateTime primeiraHoraDia = data.atStartOfDay();
		LocalDateTime segundaHoraDia = data.atTime(23, 59, 59);

		return agendamentoRepository.findByProfissionalAndDataHoraAgendamentoBetween(profissional, primeiraHoraDia, segundaHoraDia);
	}
	
	public Agendamento atualizarAgendamento(Agendamento agendamento, LocalDateTime horaInicio, LocalDateTime horaFim) {
		List<Agendamento> agenda = agendamentoRepository.findByDataHoraAgendamentoBetween(horaInicio, horaFim);
		
		if (!agenda.isEmpty()) {
			throw new RuntimeException("O horário já está preenchido.");
		}
		
		agendamento.setId(agendamento.getId());
		return agendamentoRepository.save(agendamento);
	}
	
	public void removerAgendamento(String cliente, LocalDateTime dataHoraAgendamento) {
		agendamentoRepository.deleteByClienteAndDataHoraAgendamento(cliente, dataHoraAgendamento);
	}

}
