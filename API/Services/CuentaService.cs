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
    public static class CuentaService
    {
        static List<Cuenta> Cuentas { get; }
        static string nombreDB = "cuentas";
        static CuentaService()
        {
            Cuentas = JsonConvert.DeserializeObject<List<Cuenta>>(JSONManager.loadDB_string(nombreDB));
        }

        // Obtiene todas las cuentas.
        public static List<Cuenta> GetAll() => Cuentas;


        // Obtiene la cuenta que coincida con el numero de cuenta.
        public static Cuenta Get(string Numero_Cuenta) => Cuentas.FirstOrDefault(p => p.Numero_Cuenta == Numero_Cuenta);

        // Agrega un nuevo cuenta a la lista de cuentas.
        public static void Add(Cuenta cuenta)
        {   
            Cuentas.Add(cuenta);
            UpdateJson();
        }

        // Elimina un cuenta de la lista de cuentas.
        public static void Delete(string Numero_Cuenta)
        {
            var cuenta = Get(Numero_Cuenta);
            if(cuenta is null)
                return;

            Cuentas.Remove(cuenta);
            UpdateJson();
        }                    

        // Modifica un cuenta de la lista de cuentas.
        public static void Update(Cuenta cuenta)
        {
            var index = Cuentas.FindIndex(p => p.Numero_Cuenta == cuenta.Numero_Cuenta);
            if(index == -1)
                return;
            Cuentas[index] = cuenta;
            UpdateJson();
        }

        public static void UpdateJson()
        {
            File.WriteAllText(@"JSON_FILES\"+nombreDB+".json", JsonConvert.SerializeObject(Cuentas));
        }


        public static bool Has_null_attributes(Cuenta c)
        {
            if (c.Numero_Cuenta is null |
                    c.Descripcion is null |
                    c.Moneda is null |
                    c.Tipo is null |
                    c.Cliente_Propietario is null)
                return true;
            return false;
        }


    }
}