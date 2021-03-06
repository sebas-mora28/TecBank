using System.Collections.Generic;

namespace BoldAPI.Models
{
    public class Cliente : User
    {
        
        public string Nombre_Completo { get; set; }
        public string Cedula { get; set; }
        public string Direccion { get; set; } 
        public IList<string> Telefonos { get; set; }
        public double Ingreso_Mensual { get; set; }

        // (Físico, Jurídico)
        public string Tipo_de_cliente { get; set; }

        public IList<Prestamo> Prestamos{get;set;} 
    }
}