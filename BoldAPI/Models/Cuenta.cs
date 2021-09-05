using System.Collections.Generic;
namespace BoldAPI.Models
{
    public class Cuenta
    {
        // Atributo llave
        public string Numero_Cuenta { get; set; }
        public string Descripcion { get; set; }
        public string Moneda { get; set; }
        public string Tipo { get; set; }
        public string Cedula_Propietario { get; set; }
        public double Saldo { get; set; }
        public List<Movimiento> Movimientos { get; set; }

    }

}