using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;


namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class EventoController : ControllerBase
{
    public EventoController(){}

    public IEnumerable<Evento> _evento = new Evento[] {
        new Evento(){
            EventoId = 1,
            Tema = "teste",
            Local = "BH",
            Lote =  "1º lote",
            QtdPessoas = 250,
            DataEvento = DateTime.Now.AddDays(2).ToString()
        },

        new Evento(){
            EventoId = 2,
            Tema = "teste",
            Local = "SP",
            Lote =  "2º lote",
            QtdPessoas = 50,
            DataEvento = DateTime.Now.AddDays(2).ToString()
        }
    };

    [HttpGet]
    public IEnumerable<Evento> GetAllEventos(){
        return _evento;
    }

    [HttpGet("{id}")]
    public IEnumerable<Evento> GetEventosbyId(int id){
        return _evento.Where(p => p.EventoId == id);
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