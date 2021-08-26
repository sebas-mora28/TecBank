namespace API.Models
{
    public class Cliente
    {
        
        public string Nombre_Completo { get; set; }
        public string Cedula { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public double Ingreso_Mensual { get; set; }

        // (Físico, Jurídico)
        public string Tipo { get; set; }
        

    }
}