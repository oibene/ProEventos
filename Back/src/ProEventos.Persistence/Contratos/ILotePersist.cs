using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        Task<Lote[]> GetLotesByEventoIdsAsync(int eventoId);
        Task<Lote> GetLoteByIdAsync(int eventoId, int id);
    }
}