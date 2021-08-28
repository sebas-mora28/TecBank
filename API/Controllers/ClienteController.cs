using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        public ClienteController(){}

        // GET all action
        [HttpGet]
        public ActionResult<List<Cliente>> GetAll() =>
            ClienteService.GetAll();

        // GET by Cedula action
        [HttpGet("{cedula}")]
        public ActionResult<Cliente> Get(string cedula)
        {
            var cliente = ClienteService.Get(cedula);

            if(cliente == null)
                return NotFound();

            return cliente;
        }

        // POST action
        [HttpPost]
        public IActionResult Create(Cliente cliente)
        {   
            // No se permiten atributos cuando se crea un cliente.
            if (ClienteService.Has_null_attributes(cliente))
                return BadRequest("\tEs necesario que toda la informacion del cliente esté completa.");

            // Solo se permite cliente de tipo fisico o juridico.
            if (ClienteService.Has_incorrect_client_type(cliente))
                return BadRequest("\tEl tipo del cliente solo puede ser Físico o Juridico.");

            /* Si se realiza un get con la cedula del cliente ingresado y el retorno no es nulo, 
               significa que ya existe un cliente almacenado con esa cedula.*/
            if (ClienteService.Get(cliente.Cedula) != null)
                return BadRequest("\tYa existe un cliente registrado con este número de cédula.");

            ClienteService.Add(cliente);
            return CreatedAtAction(nameof(Create), cliente);
        }

        // PUT action
        [HttpPut("{cedula}")]
        public IActionResult Update(string cedula, Cliente cliente)
        {

            var existing_client = ClienteService.Get(cedula);
            if(existing_client is null)
                return NotFound();

            ClienteService.Update(cliente);           

            return NoContent();
        }

        // DELETE action
        [HttpDelete("{cedula}")]
        public IActionResult Delete(string cedula)
        {
            var cliente = ClienteService.Get(cedula);
            if (cliente is null)
                return NotFound();

            ClienteService.Delete(cedula);

            return NoContent();
        }

    }
}