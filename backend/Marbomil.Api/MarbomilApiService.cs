using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api
{
    public class MarbomilApiService
    {
        private IDisposable webApp;

        public void Start()
        {
            string port = ConfigurationManager.AppSettings["Port"];

            this.webApp = WebApp.Start<Startup>($"http://*:{port}/");
        }

        public void Stop()
        {
            this.webApp?.Dispose();
        }

    }
}
