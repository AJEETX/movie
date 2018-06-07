using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SelfHostApi.Controller
{
    public class HelloController:ApiController
    {
        [HttpGet]
        [Route("test")]
        public IHttpActionResult GetTest()
        {
            System.Console.WriteLine("GET TEST");
            return Content(System.Net.HttpStatusCode.OK, "SelfHostedServer");
        }
    }
}
