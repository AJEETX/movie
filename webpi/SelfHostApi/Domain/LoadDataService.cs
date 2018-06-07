using Newtonsoft.Json;
using SelfHostApi.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;

namespace SelfHostApi.Domain
{
    public interface ILoadDataService
    {
        IEnumerable<Movie> GetMovies(string filepath);
    }
    class LoadDataService : ILoadDataService
    {
        public IEnumerable<Movie> GetMovies(string filepath)
        {
            return LoadCinemas(filepath);
        }

        static List<Movie> LoadCinemas(string filepath)
        {
            using (StreamReader r = new StreamReader(filepath))
            {
                string json = r.ReadToEnd();
                Thread.Sleep(new Random().Next(4000));
                return JsonConvert.DeserializeObject<List<Movie>>(json);
            }
        }
    }
}
