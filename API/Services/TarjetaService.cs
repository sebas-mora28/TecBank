using API.Models;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Data;
using System;
using System.IO;
using System.Text;



namespace API.Services
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
        public static Tarjeta Get(string Numero_de_tarjeta) => Tarjetas.FirstOrDefault(p => p.Numero_de_tarjeta == Numero_de_tarjeta);

        // Agrega un nuevo tarjeta a la lista de tarjetas.
        public static void Add(Tarjeta tarjeta)
        {   
            Tarjetas.Add(tarjeta);
            UpdateJson();
        }

        // Elimina un tarjeta de la lista de tarjetas.
        public static void Delete(string nombre)
        {
            var tarjeta = Get(nombre);
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
            File.WriteAllText(@"JSON_FILES\"+nombreDB+".json", JsonConvert.SerializeObject(Tarjetas));
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