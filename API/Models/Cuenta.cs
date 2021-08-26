using System.Collections.Generic;
namespace API.Models
{
    public class Cuenta
    {
        // Atributo llave
        public string Numero_Cuenta { get; set; }
        public string Descripcion { get; set; }
        public string Moneda { get; set; }
        public string Tipo { get; set; }
        public string Cliente_Propietario { get; set; }
        public IList<string> Tarjetas{get;set;}
    }
}