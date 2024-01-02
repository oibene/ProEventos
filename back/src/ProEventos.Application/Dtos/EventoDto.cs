using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
        StringLength(50, MinimumLength = 4, ErrorMessage = "{0} deve ter no mínimo 4 caracteres e não ultrapassar 50 caracteres.")]
        public string Tema { get; set; }

        [Display(Name ="Qtd Pessoas"),
        Range(1, 120000, ErrorMessage ="{0} deve ter no mínimo 1 pessoa e não ultrapassar 120.000.")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "URL de imagem inválida. (use gif, jpg, jpeg, bmp, png)")]
        public string ImgUrl { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        Phone(ErrorMessage ="{0} é inválido.")]
        public string Telefone { get; set; }

        [Display(Name ="e-mail"),
        Required(ErrorMessage = "O campo {0} é obrigatório."),
        EmailAddress(ErrorMessage = "O campo {0} precisa ser um e-mail válido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
    }
}