using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class PalestranteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string MiniCurriculo { get; set; }
        public string ImagemURL { get; set; }

        [Required( ErrorMessage ="O campo {0} é obrigatório"),
        Phone(ErrorMessage ="O campo {0} precisa ser válido.")]
        public string Telefone { get; set; }

        [Display(Name ="e-mail"),
        Required( ErrorMessage ="O campo {0} é obrigatório"),
        EmailAddress(ErrorMessage ="O campo {0} precisa ser válido.")]
        public string Email { get; set; }

        // associação
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}