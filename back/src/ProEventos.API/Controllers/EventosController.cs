using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class EventosController : ControllerBase
{
    private readonly IEventosService _eventoService; //ta buscando do banco
    public EventosController(IEventosService eventoService){
        _eventoService = eventoService;
    }

    [HttpGet]
    public async Task<IActionResult> Get(){
        try {
            var eventos = await _eventoService.GetAllEventosAsync(true);
            return (eventos == null) ? NoContent() : Ok(eventos);
        }
        catch (Exception ex) {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar recuperar evento. Erro: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id){
        try {
            var eventos = await _eventoService.GetEventoByIdAsync(id, true);
            return (eventos == null) ? NoContent() : Ok(eventos);
        }
        catch (Exception ex) {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar recuperar evento. Erro: {ex.Message}");
        }
    }

    [HttpGet("tema/{tema}")]
    public async Task<IActionResult> GetByTema(string tema){
        try {
            var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
            return (eventos == null) ? NoContent() : Ok(eventos);
        }
        catch (Exception ex) {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar recuperar evento. Erro: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(EventoDto model){
        try {
            var eventos = await _eventoService.AddEventos(model);
            return (eventos == null) ? NoContent() : Ok(eventos);
        }
        catch (Exception ex) {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar adicionar evento. Erro: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, EventoDto model){
        try {
            var eventos = await _eventoService.UpdateEventos(id, model);
            return (eventos == null) ? NoContent() : Ok(eventos);
        }
        catch (Exception ex) {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar atualizar evento. Erro: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id){
        try {
            return (await _eventoService.DeleteEventos(id)) ? Ok("Deletado") : BadRequest("Evento não deletado.");
        }
        catch (Exception ex) {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                                    $"Erro ao tentar excluir evento. Erro: {ex.Message}");
        }
    }
}