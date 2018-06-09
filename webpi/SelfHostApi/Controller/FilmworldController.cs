using SelfHostApi.Domain;
using System.Web.Http;

namespace SelfHostApi.Controller
{
    [RoutePrefix("api/filmworld")]
    public class FilmController : ApiController
    {
        private readonly IFilmService _IFilmService;
        public FilmController(IFilmService IFilmService)
        {
            _IFilmService = IFilmService;
        }

        [Route("movies")]
        public IHttpActionResult GetMovies( string key)
        {
            if (Startup.key != key) return BadRequest("Incorrect key");
            System.Console.WriteLine("GET films");
            try
            {
                var films = _IFilmService.GetFilms();
                return Ok(new { results = films });
            }
            catch (System.Exception)
            {
                return InternalServerError();
            }
        }
        [Route("movies/{id}")]
        public IHttpActionResult GetMovie(string key, int id)
        {
            if (Startup.key != key) return BadRequest("Incorrect key");
            System.Console.WriteLine("GET film by Id="+id);
            try
            {
                var film = _IFilmService.GetFilm(id);
                return Ok(new { results = film });
            }
            catch (System.Exception)
            {
                return InternalServerError();
            }
        }
    }
}
