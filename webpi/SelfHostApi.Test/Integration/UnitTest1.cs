using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SelfHostApi.Domain;

namespace SelfHostApi.Test.Integration
{
    [TestClass]
    public class CinemaServiceIntegrationTests
    {
        [TestMethod]
        public void GetCinemasTest_return_collection_of_cinema()
        {
            //given
            var loadMoviesService = new LoadDataService();
            var sut = new CinemaService(loadMoviesService);

            //when
            var result = sut.GetCinemas();

            //then
            Assert.IsNotNull(result);
        }
        [TestMethod]
        public void GetCinemaTest_return_cinema_if_provided_correct_id()
        {
            //given
            var loadMoviesService = new LoadDataService();
            var sut = new CinemaService(loadMoviesService);

            //when
            var result = sut.GetCinema(3);

            //then
            Assert.IsNotNull(result);
        }
    }
}
