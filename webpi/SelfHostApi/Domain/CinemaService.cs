using SelfHostApi.Model;
using System.Collections.Generic;
using System.Linq;

namespace SelfHostApi.Domain
{
    public interface ICinemaService
    {
        IEnumerable<Movie> GetCinemas();
        Movie GetCinema(int id);
    }
    class CinemaService : ICinemaService
    {
        string filepath = "../data/cinema.json";
        ILoadDataService _ILoadDataService;
        public CinemaService(ILoadDataService ILoadDataService)
        {
            _ILoadDataService = ILoadDataService;
        }
        public IEnumerable<Movie> GetCinemas()
        {
            var movies = _ILoadDataService.GetMovies(filepath);
            return movies;
        }
        public Movie GetCinema(int id)
        {
            var movie = GetCinemas().Where(m => m.Id == id).FirstOrDefault();
            return movie;
        }
    }
}
