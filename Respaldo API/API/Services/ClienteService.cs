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
        static ClienteService()
        {
            Clientes = new List<Cliente>();

            string path = @"JSON_FILES\clientes.json";

            string json = File.ReadAllText(path);

            List<Cliente> clients = JsonConvert.DeserializeObject<List<Cliente>>(json);

            foreach (Cliente c in clients)
            {
                Clientes.Add(new Cliente{Nombre = c.Nombre, Cedula = c.Cedula});
            }
            
        }
        // Obtiene todos los clientes.
        public static List<Cliente> GetAll() => Clientes;


        // Obtiene el cliente que coincida con el nombre deseado.
        public static Cliente Get(string nombre) => Clientes.FirstOrDefault(p => p.Nombre == nombre);

        // Agrega un nuevo cliente a la lista de clientes.
        public static void Add(Cliente cliente)
        {   
            Clientes.Add(cliente);
            UpdateJson();
        }

        // Verifica la disponibilidad del nombre para un nuevo cliente.
        public static bool Is_available(Cliente cliente)
        {
            foreach (Cliente element in Clientes)
            {
                if(cliente.Nombre == element.Nombre)
                    return false;
            }
            return true;
        }

        // Elimina un cliente de la lista de clientes.
        public static void Delete(string nombre)
        {
            var cliente = Get(nombre);
            if(cliente is null)
                return;

            Clientes.Remove(cliente);
            UpdateJson();
        }                    

        // Modifica un cliente de la lista de clientes.
        public static void Update(Cliente cliente)
        {
            var index = Clientes.FindIndex(p => p.Nombre == cliente.Nombre);
            if(index == -1)
                return;
            Clientes[index] = cliente;
            UpdateJson();
        }

        public static void UpdateJson()
        {
            File.WriteAllText(@"JSON_FILES\clientes.json", JsonConvert.SerializeObject(Clientes));
        }



    }
}