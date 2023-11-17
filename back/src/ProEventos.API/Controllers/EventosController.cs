using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class EventosController : ControllerBase
{
    private readonly DataContext _context; //ta buscando do banco
    public EventosController(DataContext context){
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Evento> GetAllEventos(){
        return _context.Eventos;
    }

    [HttpGet("{id}")]
    public Evento GetEventosbyId(int id){
        return _context.Eventos.FirstOrDefault(p => p.EventoId == id);
    }

    [HttpPost]
    public string Post(){
        return "post";
    }

    [HttpPut("{id}")]
    public string Put(int id){
        return $"put id = {id}";
    }

    [HttpDelete("{id}")]
    public string Delete(int id){
        return $"delete id = {id}";
    }
}