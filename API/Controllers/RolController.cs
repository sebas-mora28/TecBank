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
            
            if (RolService.Is_available(rol) == false)
                return BadRequest("\tEl nombre del rol es invalido");
            
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

            RolService.Update(rol);           

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