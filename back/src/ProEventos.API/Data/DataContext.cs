using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.API.Models;

namespace ProEventos.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {} //construtor que passa configurações pro pai

        //mapeando banco de dados :))
        public DbSet<Evento> Eventos { get; set; }
    }
}