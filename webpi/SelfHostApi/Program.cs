using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SelfHostApi
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9876/";
            Console.Title = "Self Host Api";
            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine($"{Console.Title} starting on ::" + baseAddress + "...");
                var client = new HttpClient();
                Console.WriteLine("Running test request on ::" + baseAddress + "...");
                string geturl = baseAddress + "test";
                var response = client.GetAsync(geturl).Result;

                Console.WriteLine(response);
                Console.WriteLine(response.Content.ReadAsStringAsync().Result);
                Console.WriteLine();
                Thread.Sleep(Timeout.Infinite);
            }
        }
    }
}
