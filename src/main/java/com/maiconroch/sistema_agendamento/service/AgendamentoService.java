package com.maiconroch.sistema_agendamento.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.maiconroch.sistema_agendamento.infrastructure.model.Agendamentos;
import com.maiconroch.sistema_agendamento.infrastructure.repository.AgendamentoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

	private final AgendamentoRepository agendamentoRepository;
	
	public Agendamentos salvarAgendamento(Agendamentos agendamento) {
		LocalDateTime horaInicio = agendamento.getDataHoraAgendamento();
		LocalDateTime horaFim = agendamento.getDataHoraAgendamento().plusHours(agendamento.getServico().getDuracaoMinutos());
		String funcionario = agendamento.getFuncionario().getNome();
				
		List<Agendamentos> agendados = agendamentoRepository.findByProfissionalAndDataHoraAgendamentoBetween(funcionario, horaInicio, horaFim);
		
		if (!agendados.isEmpty()) {
			throw new RuntimeException("O horário já está preenchido.");
		}
		
		return agendamentoRepository.save(agendamento);
	}
	
	public List<Agendamentos> consultarAgendamentosDia(LocalDate data) {
		LocalDateTime primeiraHoraDia = data.atStartOfDay();
		LocalDateTime segundaHoraDia = data.atTime(23, 59, 59);
		
		return agendamentoRepository.findByDataHoraAgendamentoBetween(primeiraHoraDia, segundaHoraDia);
	}
	
	public List<Agendamentos> consultarAgendamentosClienteDia(String cliente, LocalDate data) {
		LocalDateTime primeiraHoraDia = data.atStartOfDay();
		LocalDateTime segundaHoraDia = data.atTime(23, 59, 59);

		return agendamentoRepository.findByClienteAndDataHoraAgendamentoBetween(cliente, primeiraHoraDia, segundaHoraDia);
	}
	
	public List<Agendamentos> consultarAgendamentosProfissionalDia(String profissional, LocalDate data) {
		LocalDateTime primeiraHoraDia = data.atStartOfDay();
		LocalDateTime segundaHoraDia = data.atTime(23, 59, 59);

		return agendamentoRepository.findByProfissionalAndDataHoraAgendamentoBetween(profissional, primeiraHoraDia, segundaHoraDia);
	}
	
	public Agendamentos atualizarAgendamento(Agendamentos agendamento, LocalDateTime horaInicio, LocalDateTime horaFim) {
		List<Agendamentos> agenda = agendamentoRepository.findByDataHoraAgendamentoBetween(horaInicio, horaFim);
		
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
