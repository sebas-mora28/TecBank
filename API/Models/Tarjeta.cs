using System.Collections.Generic;
namespace API.Models
{
    public class Tarjeta
    {
        // Atributo llave
        public string Numero_de_tarjeta { get; set; }
        public string Fecha_de_expiracion { get; set; }
        public string Codigo_de_Seguridad{get;set;}
        public string Tipo { get; set; }
        public long Saldo_Disponible { get; set; }
        public long Monto_de_credito { get; set; }
        public string Numero_Cuenta{get;set;}
    }
}