using SelfHostApi.Model;
using System.Collections.Generic;
using System.Linq;

namespace SelfHostApi.Domain
{
    public interface IFilmService
    {
        IEnumerable<Movie> GetFilms();
        Movie GetFilm(int id);
    }
    class FilmService : IFilmService
    {
        string filepath = "../data/film.json";
        ILoadDataService _ILoadDataService;
        public FilmService(ILoadDataService ILoadDataService)
        {
            _ILoadDataService = ILoadDataService;
        }
        public IEnumerable<Movie> GetFilms()
        {
            return _ILoadDataService.GetMovies(filepath);
        }
        public Movie GetFilm(int id)
        {
            var movies = GetFilms();
            return movies.Where(m => m.Id == id).FirstOrDefault();
        }
    }
}
