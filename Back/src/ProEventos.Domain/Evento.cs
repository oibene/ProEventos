using System;
using System.Collections.Generic;


namespace ProEventos.Domain
{
    public class Evento
    {

/* CASO O BANCO DE DADOS TENHA OUTRO NOME

using System.ComponentModel.DataAnnotations.Schema;

[Table("TabelaDoBanco")]

[Key]
[ForeignKey("TabelaEstrangeira")]
[*/

        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime? DataEvento { get; set; } //nulo (?)
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<Lote> Lotes { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}