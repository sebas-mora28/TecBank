using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RolController : ControllerBase
    {
        public RolController()
        {
        }

        // GET all action
        [HttpGet]
        public ActionResult<List<Rol>> GetAll() =>
            RolService.GetAll();

        // GET by Name action
        [HttpGet("{nombre}")]
        public ActionResult<Rol> Get(string nombre)
        {
            var rol = RolService.Get(nombre);

            if(rol == null)
                return NotFound();

            return rol;
        }

        // POST action
        [HttpPost]
        public IActionResult Create(Rol rol)
        {   
            // No se permiten atributos cuando se crea un cliente.
            if (RolService.Has_null_attributes(rol))
                return BadRequest("\tEs necesario que toda la informacion del rol esté completa.");

            /* Si se realiza un get con el nombre del rol ingresado y el retorno no es nulo, 
               significa que ya el nombre del rol se encuentra en uso.*/
            if (RolService.Get(rol.Nombre) != null)
                return BadRequest("\tEste nombre de rol ya se encuentra en uso.");
            
            RolService.Add(rol);
            return CreatedAtAction(nameof(Create), rol);
        }



        // PUT action
        [HttpPut("{nombre}")]
        public IActionResult Update(string nombre, Rol rol)
        {

            var existing_rol = RolService.Get(nombre);


            if(existing_rol is null)
                return NotFound();

            
            RolService.Delete(nombre);
            RolService.Add(rol);       

            return NoContent();
        }

        // DELETE action
        [HttpDelete("{nombre}")]
        public IActionResult Delete(string nombre)
        {
            var rol = RolService.Get(nombre);

            if (rol is null)
                return NotFound();

            RolService.Delete(nombre);

            return NoContent();
        }

    }
}