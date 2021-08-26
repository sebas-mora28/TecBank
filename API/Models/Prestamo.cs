using System.Collections.Generic;
namespace API.Models
{
    public class Prestamo
    {
        // Atributo llave
        public int Numero_de_prestamo{get;set;}
        public float Tasa_de_interes { get; set; }
        public long Monto_original { get; set; }
        public int Saldo{get;set;}
        public IList<Pago> Pagos{get;set;}
    }
}