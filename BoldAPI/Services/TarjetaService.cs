using BoldAPI.Models;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Data;
using System;
using System.IO;
using System.Text;



namespace BoldAPI.Services
{
    public static class TarjetaService
    {
        static List<Tarjeta> Tarjetas { get; }
        static string nombreDB = "tarjetas";
        static TarjetaService()
        {
            Tarjetas = JsonConvert.DeserializeObject<List<Tarjeta>>(JSONManager.loadDB_string(nombreDB));
        }

        // Obtiene todos los tarjetas.
        public static List<Tarjeta> GetAll() => Tarjetas;


        // Obtiene el tarjeta que coincida con la Numero_de_tarjeta deseada.
        public static Tarjeta Get_By_Num_Tarjeta(string Numero_de_tarjeta) => Tarjetas.FirstOrDefault(p => p.Numero_de_tarjeta == Numero_de_tarjeta);

        
        // Obtiene las tarjetas  que coincida con el numero de cuenta.
        public static List<Tarjeta> Get_By_Num_Cuenta(string Numero_cuenta) => Tarjetas.FindAll(p => p.Numero_Cuenta == Numero_cuenta);

        // Agrega un nuevo tarjeta a la lista de tarjetas.
        public static void Add(Tarjeta tarjeta)
        {   
            Tarjetas.Add(tarjeta);
            UpdateJson();
        }

        // Elimina un tarjeta de la lista de tarjetas.
        public static void Delete(string nombre)
        {
            var tarjeta = Get_By_Num_Tarjeta(nombre);
            if(tarjeta is null)
                return;

            Tarjetas.Remove(tarjeta);
            UpdateJson();
        }                    

        // Modifica un tarjeta de la lista de tarjetas.
        public static void Update(Tarjeta tarjeta)
        {
            var index = Tarjetas.FindIndex(p => p.Numero_de_tarjeta == tarjeta.Numero_de_tarjeta);
            if(index == -1)
                return;
            Tarjetas[index] = tarjeta;
            UpdateJson();
        }

        public static void UpdateJson()
        {
            string text = JsonConvert.SerializeObject(Tarjetas, Formatting.Indented);
            File.WriteAllText(@"JSON_FILES\"+nombreDB+".json", text);
        }


        public static bool Has_null_attributes(Tarjeta t)
        {
            if (t.Numero_de_tarjeta is null |
                    t.Fecha_de_expiracion is null |
                    t.Codigo_de_Seguridad is null |
                    t.Tipo is null |
                    t.Numero_Cuenta is null )
                return true;
            return false;
        }


    }
}