using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication6.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }
        [HttpGet("[action]")]
        public string CompanyData()
        {
            var jsonData = "[{\"Name\":\"OPRS\",\"CompanyCode\":\"OPRS\"},{\"Name\":\"T210\",\"CompanyCode\":\"T210\"},{\"Name\":\"OPRP\",\"CompanyCode\":\"OPRP\"},{\"Name\":\"EC\",\"CompanyCode\":\"EC\"},{\"Name\":\"DAT\",\"CompanyCode\":\"DAT\"},{\"Name\":\"OPR\",\"CompanyCode\":\"OPR\"}]";
            return jsonData;
        }

        [HttpGet("[action]")]
        public string ProductLineData()
        {
            var jsonData = "[{\"Name\":\"Olympus\",\"ProdUnitId\":\"Olympus\"},{\"Name\":\"Specials\",\"ProdUnitId\":\"Specials\"}]";

            return jsonData;
        }
        [HttpGet("[action]")]
        public string Company(string name)
        {
            return name;
        }
        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
