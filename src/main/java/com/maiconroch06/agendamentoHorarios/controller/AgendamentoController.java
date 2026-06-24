package com.maiconroch06.agendamentoHorarios.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maiconroch06.agendamentoHorarios.infrastructure.model.Agendamento;
import com.maiconroch06.agendamentoHorarios.service.AgendamentoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

	private final AgendamentoService agendamentoService;
	
	@PostMapping
	public ResponseEntity<Agendamento> salvarAgendamento(@RequestBody Agendamento agendamento) {
		return ResponseEntity.ok().body(agendamentoService.salvarAgendamento(agendamento));
	}
	
	@GetMapping("/dia")
	public ResponseEntity<List<Agendamento>> buscarAgendamentosDia(@RequestParam LocalDate data) {
		return ResponseEntity.ok().body(agendamentoService.consultarAgendamentosDia(data));
	}
	
	@GetMapping("/cliente")
	public ResponseEntity<List<Agendamento>> buscarAgendamentosClienteDia(@RequestParam String cliente, @RequestParam LocalDate data) {
		return ResponseEntity.ok().body(agendamentoService.consultarAgendamentosClienteDia(cliente, data));
	}

	@GetMapping("/profissional")
	public ResponseEntity<List<Agendamento>> buscarAgendamentosProfissionalDia(@RequestParam String profissional, @RequestParam LocalDate data) {
		return ResponseEntity.ok().body(agendamentoService.consultarAgendamentosProfissionalDia(profissional, data));
	}
	
	@PutMapping
	public ResponseEntity<Agendamento> atualizarAgendamento(@RequestBody Agendamento agendamento,
															@RequestParam LocalDateTime dataHoraInicio,
															@RequestParam LocalDateTime dataHoraFim) {
		
		return ResponseEntity.ok().body(agendamentoService.atualizarAgendamento(agendamento, dataHoraInicio, dataHoraFim));
	}

	@DeleteMapping
	public ResponseEntity<Void> deletarAgendamento(@RequestParam String cliente,
												   @RequestParam LocalDateTime dataHoraAgendamento) {
		agendamentoService.removerAgendamento(cliente, dataHoraAgendamento);
		return ResponseEntity.noContent().build();
	}
}
