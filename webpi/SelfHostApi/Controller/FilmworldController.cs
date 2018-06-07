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
        public IHttpActionResult GetMovies()
        {
            System.Console.WriteLine("GET films");
            var films = _IFilmService.GetFilms();
            return Ok(new { results = films });
        }
        [Route("movies/{id}")]
        public IHttpActionResult GetMovie(int id)
        {
            System.Console.WriteLine("GET film by Id="+id);
            var film = _IFilmService.GetFilm(id);
            return Ok(new { results = film });
        }
    }
}
