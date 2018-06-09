using SelfHostApi.Domain;
using System.Web.Http;

namespace SelfHostApi.Controller
{
    [RoutePrefix("api/cinemaworld")]
    public class CinemaController : ApiController
    {
        private readonly ICinemaService _ICinemaService;
        public CinemaController(ICinemaService ICinemaService)
        {
            _ICinemaService = ICinemaService;
        }

        [Route("movies")]
        public IHttpActionResult GetMovies( string key)
        {
            if (Startup.key != key) return BadRequest("Incorrect key");
            System.Console.WriteLine("GET cinemas");
            try
            {
                var cinemas = _ICinemaService.GetCinemas();
                return Ok(new { results = cinemas });
            }
            catch (System.Exception)
            {
                return InternalServerError();
            }
        }
        [Route("movies/{id}")]
        public IHttpActionResult GetMovie(string key,int id)
        {
            if (Startup.key != key) return BadRequest("Incorrect key");
            System.Console.WriteLine("GET cinema by Id=" + id);
            try
            {
                var cinema = _ICinemaService.GetCinema(id);
                return Ok(new { results = cinema });
            }
            catch (System.Exception)
            {
                return InternalServerError();
            }
        }
    }
}
