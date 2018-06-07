using Microsoft.Owin.Hosting;
using System;
using System.Net.Http;
using System.Threading;
using Unity;

namespace SelfHostApi
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9876/";
            Console.Title = "Self Host Api";
            var startup = UnityConfig.Container.Resolve<Startup>();
            IDisposable webApplication = WebApp.Start(baseAddress, startup.Configuration);
            try
            {
                Console.WriteLine($"{Console.Title} starting on ::" + baseAddress + "...");
                var client = new HttpClient();
                Console.WriteLine("Running test request on ::" + baseAddress + "...");
                string geturl = baseAddress + "test";
                var response = client.GetAsync(geturl).Result;
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine(response);
                    Console.WriteLine(response.Content.ReadAsStringAsync().Result);
                    Console.WriteLine();
                    Thread.Sleep(Timeout.Infinite);
                }
            }
            finally
            {
                webApplication.Dispose();
            }
        }
    }
}
