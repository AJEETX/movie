using SelfHostApi.Domain;
using System.Linq;
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
        public IHttpActionResult GetMovies()
        {
            System.Console.WriteLine("GET cinemas");
            var cinemas = _ICinemaService.GetCinemas();
            return Ok(new { results = cinemas });
        }
        [Route("movies/{id}")]
        public IHttpActionResult GetMovie(int id)
        {
            System.Console.WriteLine("GET cinema by Id="+id);
            var cinema = _ICinemaService.GetCinema(id);
            return Ok(new { results = cinema });
        }
    }
}
