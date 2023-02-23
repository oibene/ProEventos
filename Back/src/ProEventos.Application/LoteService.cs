using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class LoteService : ILoteService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IMapper _mapper;
        private readonly ILotePersist _lotePersist;
        public LoteService(IGeralPersist geralPersist, ILotePersist lotePersist, IMapper mapper)
        {
            _mapper = mapper;
            _lotePersist = lotePersist;
            _geralPersist = geralPersist;
            
        }

        public async Task AddLote(int eventoId, LoteDto model) //void
        {
            //os lotes sao filhotes por isso precisam dos eventos
            try
            {
                var lote = _mapper.Map<Lote>(model);
                lote.EventoId = eventoId; //ele precisa pegar o id do evento :)

                _geralPersist.Update<Lote>(lote);

                await _geralPersist.SaveChangesAsync();
                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> SaveLote(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdsAsync(eventoId);
                if(lotes == null) return null;

                foreach(var model in models) //verifica 
                {
                    if (model.Id == 0)
                    {
                        await AddLote(eventoId, model);
                    }
                    else
                    {
                        var lote = lotes.FirstOrDefault(lote => lote.Id == model.Id);
                        model.EventoId = eventoId;
                        _mapper.Map(model, lote); //para quem a gente esta enviando

                        _geralPersist.Update<Lote>(lote);
                        await _geralPersist.SaveChangesAsync();

                    }

                    var loteRetorno = await _lotePersist.GetLotesByEventoIdsAsync(eventoId);
                    return _mapper.Map<LoteDto[]>(loteRetorno);
                    
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteLote(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotePersist.GetLoteByIdAsync(eventoId, loteId);
                if(lote == null) throw new Exception ("Lote para delete não encontrado.");

                _geralPersist.Delete<Lote>(lote);
                return (await _geralPersist.SaveChangesAsync());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> GetLotesByEventoIdAsync(int eventoId)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdsAsync(eventoId);
                if(lotes == null) return null;

                var resultado = _mapper.Map<LoteDto[]>(lotes);

                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto> GetLoteByIdAsync(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotePersist.GetLoteByIdAsync(eventoId, loteId);
                if(lote == null) return null;

                var resultado = _mapper.Map<LoteDto>(lote);

                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }
    }
}