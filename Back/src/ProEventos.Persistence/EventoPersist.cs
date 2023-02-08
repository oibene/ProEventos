using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class EventoPersist : IEventoPersist
    {
        private readonly ProEventosContext _context;

        public EventoPersist(ProEventosContext context)
        {
            _context = context;
            // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            // resolve os problemas mas aplica pra todos
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            //cria um query busca os eventos e add o lote e as redes
            IQueryable<Evento> query = _context.Eventos
                                    .Include(e => e.Lotes)
                                    .Include(e => e.RedesSociais);

            // se quiser incluir palestrantes ele inclui o palestrante
            if (includePalestrantes)
            {
                query = query.Include(e => e.PalestrantesEventos)
                            .ThenInclude(pe => pe.Palestrante);
            }

            //ordena pelo id
            query = query.AsNoTracking().OrderBy(e => e.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosbyTemasAsync(string tema, bool includePalestrantes = false)
        {
            
            IQueryable<Evento> query = _context.Eventos
                                    .Include(e => e.Lotes)
                                    .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(e => e.PalestrantesEventos)
                            .ThenInclude(pe => pe.Palestrante);
            }

            query = query.AsNoTracking().OrderBy(e => e.Id)
                        .Where(e => e.Tema.ToLower()
                        .Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventobyIdAsync(int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                                    .Include(e => e.Lotes)
                                    .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(e => e.PalestrantesEventos)
                            .ThenInclude(pe => pe.Palestrante);
            }

            // add .AsNoTracking() ajuda mas é mais especifico
            query = query.AsNoTracking().OrderBy(e => e.Id)
                        .Where(e => e.Id == eventoId);

            return await query.FirstOrDefaultAsync();
        }
    }
}