using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class LotePersist : ILotePersist
    {
        private readonly ProEventosContext _context;

        public LotePersist (ProEventosContext context)
        {
            _context = context;
            // _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            // resolve os problemas mas aplica pra todos
        }

        public async Task<Lote> GetLoteByIdAsync(int eventoId, int id)
        {
            //cria a query
            IQueryable<Lote> query = _context.Lotes;
            //confere as chaves estrangeiras
            query = query.AsNoTracking()
                        .Where(lote => lote.EventoId == eventoId
                        && lote.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Lote[]> GetLotesByEventoIdsAsync(int eventoId)
        {
            IQueryable<Lote> query = _context.Lotes;
            query = query.AsNoTracking()
                        .Where(lote => lote.EventoId == eventoId);

            return await query.ToArrayAsync();
        }
    }
    
}