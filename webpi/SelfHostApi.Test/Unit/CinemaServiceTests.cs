using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SelfHostApi.Model;
using System.Collections.Generic;

namespace SelfHostApi.Domain.Tests
{
    [TestClass()]
    public class CinemaServiceTests
    {
        Mock<ILoadDataService> _moqLoadDataSvc;
        [TestInitialize]
        public void Init()
        {
            _moqLoadDataSvc = new Mock<ILoadDataService>();
        }
        [TestCleanup]
        public void Clean()
        {
            _moqLoadDataSvc = null;
        }
        [TestMethod()]
        public void GetCinemasTest_return_collection_of_cinema()
        {
            //given
            var movies = new List<Movie> { };
            _moqLoadDataSvc.Setup(m => m.GetMovies(It.IsAny<string>())).Returns(movies);
            var sut = new CinemaService(_moqLoadDataSvc.Object);

            //when
            var result = sut.GetCinemas();

            //then
            Assert.IsInstanceOfType(result,typeof(IEnumerable<Movie>));
        }
        [TestMethod()]
        public void GetCinemaByIdTest_returns_cinema_if_provided_correct_id()
        {
            //given
            int id = 4;
            var movies = new List<Movie> { new Movie {Id=4,Title="Title",Price=1 } };

            _moqLoadDataSvc.Setup(m => m.GetMovies(It.IsAny<string>())).Returns(movies);
            var sut = new CinemaService(_moqLoadDataSvc.Object);

            //when
            var result = sut.GetCinema(id);

            //then
            Assert.IsInstanceOfType(result, typeof(Movie));
            Assert.IsNotNull(result);
        }
        [TestMethod()]
        public void GetCinemaByIdTest_returns_null_if_provided_incorrect_id()
        {
            //given
            int id = 40;
            var movies = new List<Movie> { new Movie { Id = 4, Title = "Title", Price = 1 } };

            _moqLoadDataSvc.Setup(m => m.GetMovies(It.IsAny<string>())).Returns(movies);
            var sut = new CinemaService(_moqLoadDataSvc.Object);

            //when
            var result = sut.GetCinema(id);

            //then
            Assert.IsNull(result);
        }
    }
}