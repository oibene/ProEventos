using ProEventos.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ProEventos.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}
        
        //mapeamento de classe pra virar banco de dados
        public DbSet<Evento> Eventos { get; set; }
    }
}