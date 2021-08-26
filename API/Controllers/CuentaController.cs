using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CuentaController : ControllerBase
    {
        public CuentaController(){}

        // GET all action
        [HttpGet]
        public ActionResult<List<Cuenta>> GetAll() =>
            CuentaService.GetAll();

        // GET by Numero_Cuenta action
        [HttpGet("{Numero_Cuenta}")]
        public ActionResult<Cuenta> Get(string Numero_Cuenta)
        {
            var cuenta = CuentaService.Get(Numero_Cuenta);

            if(cuenta == null)
                return NotFound();

            return cuenta;
        }

        // POST action
        [HttpPost]
        public IActionResult Create(Cuenta cuenta)
        {   
            // No se permiten atributos cuando se crea un cuenta.
            if (CuentaService.Has_null_attributes(cuenta))
                return BadRequest("\tEs necesario que toda la informacion del cuenta esté completa.");

            /* Si se realiza un get con la Numero_Cuenta del cuenta ingresado y el retorno no es nulo, 
               significa que ya existe un cuenta almacenado con esa Numero_Cuenta.*/
            if (CuentaService.Get(cuenta.Numero_Cuenta) != null)
                return BadRequest("\tYa existe una cuenta registrada con este número de cuenta.");

            CuentaService.Add(cuenta);
            return CreatedAtAction(nameof(Create), cuenta);
        }

        // PUT action
        [HttpPut("{Numero_Cuenta}")]
        public IActionResult Update(string Numero_Cuenta, Cuenta cuenta)
        {

            var existing_cuenta = CuentaService.Get(Numero_Cuenta);
            if(existing_cuenta is null)
                return NotFound();

            CuentaService.Update(cuenta);           

            return NoContent();
        }

        // DELETE action
        [HttpDelete("{Numero_Cuenta}")]
        public IActionResult Delete(string Numero_Cuenta)
        {
            var cuenta = CuentaService.Get(Numero_Cuenta);
            if (cuenta is null)
                return NotFound();

            CuentaService.Delete(Numero_Cuenta);

            return NoContent();
        }

    }
}