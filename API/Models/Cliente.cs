using System.Collections.Generic;

namespace API.Models
{
    public class Cliente
    {
        
        public string Nombre_Completo { get; set; }
        public string Cedula { get; set; }
        public string Direccion { get; set; } 
        public IList<string> Telefonos { get; set; }
        public double Ingreso_Mensual { get; set; }

        // (Físico, Jurídico)
        public string Tipo_de_cliente { get; set; }

        public string Usuario{get;set;}

        public string Password{get;set;}

        public IList<Prestamo> Prestamos{get;set;} 
    }
}