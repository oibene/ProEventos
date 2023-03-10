using ProEventos.Domain;
using Microsoft.EntityFrameworkCore;

namespace ProEventos.Persistence.Contextos
{
    public class ProEventosContext : DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options): base(options){}
        
        //mapeamento de classe pra virar banco de dados
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedeSociais { get; set; }
        

        // garante que sempre que existir um palestrante e um evento exista um palestrante evento
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<PalestranteEvento>()
                        .HasKey(PE => new {PE.EventoId, PE.PalestranteId});
            
            // deleta em cascada
            modelBuilder.Entity<Evento>()
            .HasMany(e => e.RedesSociais) // 1 evento tem muitas redes
            .WithOne(rs => rs.Evento) // cada rede tem seu evento
            .OnDelete(DeleteBehavior.Cascade); // deleta o evento e a rede

            modelBuilder.Entity<Palestrante>()
            .HasMany(p => p.RedesSociais)
            .WithOne(rs => rs.Palestrante)
            .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}