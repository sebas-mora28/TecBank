using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BoldAPI.Models;
using BoldAPI.Services;
using System;

namespace BoldAPI.Controllers
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
        public ActionResult<Cuenta> Get_By_Numero_Cuenta(string Numero_Cuenta)
        {
            var cuenta = CuentaService.Get_By_Numero_Cuenta(Numero_Cuenta);

            if(cuenta == null)
                return NotFound();

            return cuenta;
        }

        // GET by Cedula
        [HttpGet("cuentas/{cedula}")]
        public ActionResult<List<Cuenta>> Get_By_Cedula(string cedula)
        {
            var cuenta = CuentaService.Get_By_Cedula(cedula);
            
            if(cuenta == null)
                return NotFound();
            return cuenta;
        }


                // GET by Numero_Cuenta action
        [HttpGet("{Numero_Cuenta}/mv")]
        public ActionResult<List<Movimiento>> Get_Movimiento(string Numero_Cuenta)
        {
            var cuenta = CuentaService.Get_By_Numero_Cuenta(Numero_Cuenta);

            if(cuenta == null)
                return NotFound();

            return cuenta.Movimientos;
        }


        // POST action
        [HttpPost]
        public IActionResult Create(Cuenta cuenta)
        {   
            // No se permiten atributos cuando se crea un cuenta.
            if (CuentaService.Has_null_attributes(cuenta))
                return BadRequest("\tEs necesario que toda la informacion del cuenta esté completa.");
            
            // Solo se permite moneda de tipo dolares, colones, euros
            if (CuentaService.Has_incorrect_coin_type(cuenta))
                return BadRequest("\tEl tipo de moneda de la cuenta solo puede ser de Colones, Dólares o Euros.");

            // Solo se permite cuenta de tipo ahorros o corriente.
            if (CuentaService.Has_incorrect_account_type(cuenta))
                return BadRequest("\tLa cuenta solo puede ser de tipo Ahorros o Corriente.");

            /* Si se realiza un get con la Numero_Cuenta del cuenta ingresado y el retorno no es nulo, 
               significa que ya existe un cuenta almacenado con esa Numero_Cuenta.*/
            if (CuentaService.Get_By_Numero_Cuenta(cuenta.Numero_Cuenta) != null)
                return BadRequest("\tYa existe una cuenta registrada con este número de cuenta.");

            // El cliente al que pertenece la cuenta debe existir.
            Cliente propietario = ClienteService.Get(cuenta.Cedula_Propietario);
            if (propietario is null)
                return NotFound();

            // Inicializar atributos de listas, para evitar errores.
            if (cuenta.Movimientos is null)
                cuenta.Movimientos = new List<Movimiento>();

            CuentaService.Add(cuenta);
            // propietario.Cuentas.Add(cuenta.Numero_Cuenta); // añadir al propietario como 

            return CreatedAtAction(nameof(Create), cuenta);
        }


        // PUT action
        [HttpPut("{Numero_Cuenta}")]
        public IActionResult Update(string Numero_Cuenta, Cuenta cuenta)
        {

            var existing_cuenta = CuentaService.Get_By_Numero_Cuenta(Numero_Cuenta);
            if(existing_cuenta is null)
                return NotFound();

            CuentaService.Update(cuenta);           

            return NoContent();
        }

        // DELETE action
        [HttpDelete("{Numero_Cuenta}")]
        public IActionResult Delete(string Numero_Cuenta)
        {
            var cuenta = CuentaService.Get_By_Numero_Cuenta(Numero_Cuenta);
            if (cuenta is null)
                return NotFound();

            CuentaService.Delete(Numero_Cuenta);

            return NoContent();
        }

        // DEPOSIT OR WITHDRAW action
        // PUT: /cuenta/{NUMERO DE CUENTA}=d
        // Realiza un deposito o retiro de un monto particular sobre cuenta que coincide con el numero de cuenta ingresado.
        [HttpPut("{Numero_Cuenta}=mv")]
        public IActionResult Transaction(string Numero_Cuenta, Movimiento movimiento)
        {

            // Verificacion de que exista la cuenta.
            var existing_cuenta = CuentaService.Get_By_Numero_Cuenta(Numero_Cuenta);
            if (existing_cuenta is null)
                return NotFound();

            // Solo se permiten transacciones de tipo Deposito o Retiro.
            if (movimiento.Tipo.ToLower() != "deposito" &&
                movimiento.Tipo.ToLower() != "depósito" &&
                movimiento.Tipo.ToLower() != "retiro")
                return BadRequest("\tEl tipo de transaccion ingresado es invalido.");

            // Si la transaccion corresponde a un deposito.
            if (movimiento.Tipo.ToLower() == "deposito" | movimiento.Tipo.ToLower() == "depósito")
            { 
                existing_cuenta.Saldo += movimiento.Monto;  // Sumar el monto al saldo actual.
                movimiento.Tipo = "Depósito";
            }

            // Si la transaccion corresponde a un retiro.
            else if (movimiento.Tipo.ToLower() == "retiro")
            {
                if (existing_cuenta.Saldo - movimiento.Monto < 0)
                    return BadRequest("\tSu saldo es insuficiente para realizar este retiro.");
                existing_cuenta.Saldo -= movimiento.Monto;  // Restar el monto al saldo actual.
                movimiento.Tipo = "Retiro";
            }

            movimiento.Fecha = DateTime.Now.ToString("dd-mmm-yyyy hh:mm:ss"); // Guardar el momento exacto de la transaccion.
            existing_cuenta.Movimientos.Add(movimiento);    // Agregar movimiento a la lista de transacciones.
            CuentaService.Update(existing_cuenta);          // Actualizar la cuenta
            return Ok(existing_cuenta.Saldo);
        }


        // TRANSFERENCE action
        // PUT: /cuenta/{NUMERO DE CUENTA}=t
        // Realiza una transferencia de un monto particular a la cuenta que coincide con el numero de cuenta ingresado.
        [HttpPut("{Numero_Cuenta}=tr")]
        public IActionResult Transference(string Numero_Cuenta, Transferencia transferencia)
        {

            // Verificacion de que exista la cuenta.
            var emisor = CuentaService.Get_By_Numero_Cuenta(Numero_Cuenta);
            if (emisor is null)
                return NotFound();

            // No se pueden hacer transferencias a uno mismo.
            if (Numero_Cuenta == transferencia.Receptor)
                return BadRequest("\tNo se pueden realizar transacciones dentro de una misma cuenta.");

            // Verificar que la cuenta a transferir exista.
            var receptor = CuentaService.Get_By_Numero_Cuenta(transferencia.Receptor);
            if (emisor is null)
                return BadRequest("\tNo se encontró una cuenta registrada con ese número de cedula.");

            // Si no se cuenta con suficiente saldo para realizar la transferencia.
            if (emisor.Saldo - transferencia.Monto < 0)
                return BadRequest("\tSu saldo es insuficiente para realizar esta transferencia.");

            receptor.Saldo += transferencia.Monto;   // Sumar el monto al saldo actual de la cuenta a transferir.
            emisor.Saldo -= transferencia.Monto;     // Restar el monto al saldo actual de la cuenta que transfiere.

            Movimiento movE = new Movimiento { 
                        Fecha = DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss"), 
                        Monto = transferencia.Monto, 
                        Tipo = "Transferencia a "+transferencia.Receptor
                        };
            Movimiento movR = new Movimiento { 
                        Fecha = DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss"), 
                        Monto = transferencia.Monto, 
                        Tipo = "Transferencia de "+Numero_Cuenta
                        };
            emisor.Movimientos.Add(movE);            // Añadir movimiento a la cuenta.
            receptor.Movimientos.Add(movR);
            CuentaService.Update(emisor);           // Actualizar datos de la cuenta.
            CuentaService.Update(receptor);

            return Ok(receptor.Saldo);

        }
    }
}