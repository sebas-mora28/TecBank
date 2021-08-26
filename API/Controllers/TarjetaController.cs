using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TarjetaController : ControllerBase
    {
        public TarjetaController(){}

        // GET all action
        [HttpGet]
        public ActionResult<List<Tarjeta>> GetAll() =>
            TarjetaService.GetAll();

        // GET by Cedula action
        [HttpGet("{Numero_de_tarjeta}")]
        public ActionResult<Tarjeta> Get(string Numero_de_tarjeta)
        {
            var tarjeta = TarjetaService.Get(Numero_de_tarjeta);

            if(tarjeta == null)
                return NotFound();

            return tarjeta;
        }

        // POST action
        [HttpPost]
        public IActionResult Create(Tarjeta tarjeta)
        {   
            // No se permiten atributos cuando se crea un tarjeta.
            if (TarjetaService.Has_null_attributes(tarjeta))
                return BadRequest("\tEs necesario que toda la informacion del tarjeta esté completa.");

            /* Si se realiza un get con la cedula del tarjeta ingresado y el retorno no es nulo, 
               significa que ya existe un tarjeta almacenado con esa cedula.*/
            if (TarjetaService.Get(tarjeta.Numero_de_tarjeta) != null)
                return BadRequest("\tYa existe un tarjeta registrado con este número de cédula.");

            TarjetaService.Add(tarjeta);
            return CreatedAtAction(nameof(Create), tarjeta);
        }

        // PUT action
        [HttpPut("{Numero_de_tarjeta}")]
        public IActionResult Update(string Numero_de_tarjeta, Tarjeta tarjeta)
        {

            var existing_tarjeta = TarjetaService.Get(Numero_de_tarjeta);
            if(existing_tarjeta is null)
                return NotFound();

            TarjetaService.Update(tarjeta);           

            return NoContent();
        }

        // DELETE action
        [HttpDelete("{Numero_de_tarjeta}")]
        public IActionResult Delete(string Numero_de_tarjeta)
        {
            var tarjeta = TarjetaService.Get(Numero_de_tarjeta);
            if (tarjeta is null)
                return NotFound();

            TarjetaService.Delete(Numero_de_tarjeta);

            return NoContent();
        }

    }
}