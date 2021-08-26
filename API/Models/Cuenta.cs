namespace API.Models
{
    public class Cuenta
    {
        public long Numero_Cuenta { get; set; }
        public string Descripcion { get; set; }
        public string Moneda { get; set; }
        public string Tipo { get; set; }
        public Cliente Cliente_Propietario { get; set; }
    }
}