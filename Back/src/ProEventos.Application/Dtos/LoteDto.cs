using System;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public string DataInicio { get; set; }
        public string DataFim { get; set; }

        [Display(Name ="Quantidade de Pessoas"),
        Required( ErrorMessage ="O campo {0} é obrigatório."),
        Range(1, 120000, ErrorMessage ="{0} não pode ser menor que 1 e maior que 120.000")]
        public int Quantidade { get; set; }

        //associação ao evento
        public int EventoId { get; set; }
        public EventoDto Evento { get; set; }
    }
}