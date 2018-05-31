using SelfHostApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SelfHostApi.Controller
{
    [RoutePrefix("api/filmworld")]
    public class FilmController : ApiController
    {
        List<Movie> movies = new List<Movie> {
            new Movie { Id = 123, Title = "Film$22", Price = 22 },
            new Movie { Id = 27, Title = "Film$4", Price = 4 },
            new Movie { Id = 13, Title = "Film$1", Price = 1 }
        };
        [Route("movies")]
        public IHttpActionResult GetMovies()
        {
            return Ok(movies.Min(m=>(m.Price)));
        }
        [Route("movies/{id}")]
        public IHttpActionResult GetMovie(int id)
        {
            return Ok(movies.Where(m => m.Id == id).FirstOrDefault());
        }
    }
}
