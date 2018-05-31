using SelfHostApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SelfHostApi.Controller
{
    [RoutePrefix("api/cinemaworld")]
    public class CinemaController : ApiController
    {
        List<Movie> movies = new List<Movie> {
                new Movie { Id = 1, Title = "Cine1", Price = 31 },
                new Movie { Id = 12, Title = "Cine1", Price = 11 },
                new Movie { Id = 21, Title = "Cine1", Price = 66 }
            };
        [Route("movies")]
        public IHttpActionResult GetMovies()
        {
            return Ok(movies.Min(m => (m.Price)));
        }
        [Route("movies/{id}")]
        public IHttpActionResult GetMovie(int id)
        {
            return Ok(movies.Where(m=>m.Id==id).FirstOrDefault());
        }
    }
}
