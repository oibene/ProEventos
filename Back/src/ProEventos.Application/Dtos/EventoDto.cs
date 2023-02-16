using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required( ErrorMessage ="O campo {0} é obrigatório"),
        StringLength(50, MinimumLength =3, ErrorMessage ="{0} deve ter entre 3 e 50 caracteres.")]
        public string Tema { get; set; }

        [Display(Name ="Quantidade de Pessoas"),
        Required( ErrorMessage ="O campo {0} é obrigatório."),
        Range(1, 120000, ErrorMessage ="{0} não pode ser menor que 1 e maior que 120.000")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(git|jpe?g|bmp\png)$", ErrorMessage ="Não é uma imagem válida.")]
        public string ImagemURL { get; set; }
        
        [Required( ErrorMessage ="O campo {0} é obrigatório."),
        Phone(ErrorMessage ="O campo {0} precisa ser válido.")]
        public string Telefone { get; set; }

        [Display(Name ="e-mail"),
        Required( ErrorMessage ="O campo {0} é obrigatório"),
        EmailAddress(ErrorMessage ="O campo {0} precisa ser válido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}