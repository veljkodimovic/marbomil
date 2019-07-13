using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Topshelf;

namespace Marbomil.Api
{
    class Program
    {
        static void Main(string[] args)
        {
            string port = ConfigurationManager.AppSettings["Port"];

            HostFactory.Run(x =>
            {
                x.Service<MarbomilApiService>(s =>
                {
                    s.ConstructUsing(api => new MarbomilApiService());
                    s.WhenStarted(api => api.Start());
                    s.WhenStopped(api => api.Stop());
                });

                x.OnException(ex =>
                {
                    string exceptionMessage = ex.Message;
                });

                x.RunAsNetworkService();

                x.SetDescription("Marbomil API service which contains APIs which exposes Marbomil's information system." +
                                $"Service has been started on the port - {port}.");
                x.SetDisplayName("Marbomil APIs service");
                x.SetServiceName("MarbomilApisService");
            });
        }
    }
}
