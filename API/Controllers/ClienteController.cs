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
        public ClienteController()
        {
        }

        // GET all action
        [HttpGet]
        public ActionResult<List<Cliente>> GetAll() =>
            ClienteService.GetAll();

        // GET by Name action
        [HttpGet("{nombre}")]
        public ActionResult<Cliente> Get(string nombre)
        {
            var cliente = ClienteService.Get(nombre);

            if(cliente == null)
                return NotFound();

            return cliente;
        }

        // POST action
        [HttpPost]
        public IActionResult Create(Cliente cliente)
        {   
            
            if (ClienteService.Is_available(cliente) == false)
                return BadRequest("\tEl nombre del cliente es invalido");

            if(!RolService.Is_available_by_name(cliente.Rol))
                return BadRequest("\tNo existe el rol que desea asignar al cliente");
            
            ClienteService.Add(cliente);
            return CreatedAtAction(nameof(Create), cliente);
        }

        // PUT action
        [HttpPut("{nombre}")]
        public IActionResult Update(string nombre, Cliente cliente)
        {

            var existing_client = ClienteService.Get(nombre);
            if(existing_client is null)
                return NotFound();

            ClienteService.Update(cliente);           

            return NoContent();
        }

        // DELETE action
        [HttpDelete("{nombre}")]
        public IActionResult Delete(string nombre)
        {
            var cliente = ClienteService.Get(nombre);

            if (cliente is null)
                return NotFound();

            ClienteService.Delete(nombre);

            return NoContent();
        }

    }
}