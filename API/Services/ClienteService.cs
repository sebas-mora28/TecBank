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
    public static class ClienteService
    {
        static List<Cliente> Clientes { get; }
        static string nombreDB = "clientes";
        static ClienteService()
        {
            Clientes = JsonConvert.DeserializeObject<List<Cliente>>(JSONManager.loadDB_string(nombreDB));
        }

        // Obtiene todos los clientes.
        public static List<Cliente> GetAll() => Clientes;


        // Obtiene el cliente que coincida con la cedula deseada.
        public static Cliente Get(string cedula) => Clientes.FirstOrDefault(p => p.Cedula == cedula);

        // Agrega un nuevo cliente a la lista de clientes.
        public static void Add(Cliente cliente)
        {
            Clientes.Add(cliente);
            UpdateJson();
        }

        // Elimina un cliente de la lista de clientes.
        public static void Delete(string nombre)
        {
            var cliente = Get(nombre);
            if (cliente is null)
                return;

            Clientes.Remove(cliente);
            UpdateJson();
        }

        // Modifica un cliente de la lista de clientes.
        public static void Update(Cliente cliente)
        {
            var index = Clientes.FindIndex(p => p.Cedula == cliente.Cedula);
            if (index == -1)
                return;
            Clientes[index] = cliente;
            UpdateJson();
        }

        public static void UpdateJson()
        {
            string text = JsonConvert.SerializeObject(Clientes, Formatting.Indented);
            File.WriteAllText(@"JSON_FILES\" + nombreDB + ".json", text);
        }


        public static bool Has_null_attributes(Cliente c)
        {
            if (c.Nombre_Completo is null |
                    c.Cedula is null |
                    c.Direccion is null |
                    c.Ingreso_Mensual is 0 |
                    c.Tipo_de_cliente is null |
                    c.Usuario is null |
                    c.Password is null)
                return true;
        
            return false;
        }

        public static bool Has_incorrect_client_type(Cliente c)
        {
            if (c.Tipo_de_cliente.ToLower().Equals("fisico") |
                c.Tipo_de_cliente.ToLower().Equals("físico") |
                c.Tipo_de_cliente.ToLower().Equals("juridico") |
                c.Tipo_de_cliente.ToLower().Equals("jurídico"))
                return false;
            return true;
        }
    }
}