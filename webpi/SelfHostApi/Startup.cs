﻿using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Routing;
using System.Web.Http.SelfHost;
using Unity.AspNet.WebApi;

namespace SelfHostApi
{
    public class Startup
    {
        string baseAddress = "http://localhost:999/";
        public const string key = "sjd1HfkjU83ksdsm3802k";

        public void Configuration(IAppBuilder app)
        {
            var config = new HttpSelfHostConfiguration(baseAddress);
            config.DependencyResolver = new UnityDependencyResolver(UnityConfig.Container);
                config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("axd", "{resource}.axd/{*pathInfo}", null, null, new StopRoutingHandler());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.EnsureInitialized();
            app.UseWebApi(config);
        }
    }
}
