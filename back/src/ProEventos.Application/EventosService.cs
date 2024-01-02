using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventosService : IEventosService
    {
        private readonly IGeralPersist _geralPersist; private readonly IEventoPersist _eventoPersist; private readonly IMapper _mapper;
        public EventosService(IGeralPersist geralPersist, IEventoPersist eventoPersist, IMapper mapper){
            _geralPersist = geralPersist; _eventoPersist = eventoPersist; _mapper = mapper;
        } 
        
        public async Task<EventoDto> AddEventos(EventoDto model){
            try {
                var evento= _mapper.Map<Evento>(model);
                _geralPersist.Add<Evento>(evento);

                if (await _geralPersist.SaveChangesAsync()){
                    var retorno = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);
                    return _mapper.Map<EventoDto>(retorno);
                }
                return null;
            }
            catch (Exception ex){
                throw new Exception(ex.Message);
            }
        }
        public async Task<EventoDto> UpdateEventos(int eventoId, EventoDto model)
        {
            try {
                var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
                if (evento == null) return null;

                model.Id = evento.Id; 
                _mapper.Map(model, evento);
                _geralPersist.Update<Evento>(evento);

                if (await _geralPersist.SaveChangesAsync()){
                    var retorno = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);
                    return _mapper.Map<EventoDto>(retorno);
                }
                return null;
            }
            catch (Exception ex){
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteEventos(int eventoId){
            try {
                var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
                if (evento == null) throw new Exception("Evento não foi encontrado!");

                _geralPersist.Delete<Evento>(evento);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex){
                throw new Exception(ex.Message);
            }
        }
        
        public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false){
            try {
                var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
                return _mapper.Map<EventoDto[]>(eventos);
            }
            catch (Exception ex){
                throw new Exception(ex.Message);
            }
        }
        
        public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try {
                var evento = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
                return _mapper.Map<EventoDto[]>(evento);
            }
            catch (Exception ex){
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            try {
                var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
                return _mapper.Map<EventoDto>(evento); //mapeando dto para evento
            }
            catch (Exception ex){
                throw new Exception(ex.Message);
            }
        }
    }
}