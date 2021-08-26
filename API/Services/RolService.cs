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
    public static class RolService
    {
        static List<Rol> Roles { get; }
        static string nombreDB = "roles";
        
        static RolService()
        {
            Roles = JsonConvert.DeserializeObject<List<Rol>>(JSONManager.loadDB_string(nombreDB));
        }

        // Obtiene todos los roles.
        public static List<Rol> GetAll() => Roles;


        // Obtiene el rol que coincida con el nombre deseado.
        public static Rol Get(string nombre) => Roles.FirstOrDefault(p => p.Nombre == nombre);

        // Agrega un nuevo rol a la lista de roles.
        public static void Add(Rol rol)
        {   
            Roles.Add(rol);
            UpdateJson();
        }

        // Verifica la disponibilidad del nombre para un nuevo rol.
        public static bool Is_available(Rol rol)
        {
            foreach (Rol element in Roles)
            {
                if(rol.Nombre == element.Nombre)
                    return false;
            }
            return true;
        }

        // Devuelve true si existe el rol pasado por parametro
        public static bool Is_available_by_name(string rol)
        {
            foreach (Rol element in Roles)
            {
                if(element.Nombre == rol)
                    return true;
            }
            return false;
        }

        // Elimina un rol de la lista de roles.
        public static void Delete(string nombre)
        {
            var rol = Get(nombre);
            if(rol is null)
                return;

            Roles.Remove(rol);
            UpdateJson();
        }                    

        // Modifica un rol de la lista de roles.
        public static void Update(Rol rol)
        {
            var index = Roles.FindIndex(p => p.Nombre == rol.Nombre);
            if(index == -1)
                return;
            Roles[index] = rol;
            UpdateJson();
        }

        public static void UpdateJson()
        {
            File.WriteAllText(@"JSON_FILES\roles.json", JsonConvert.SerializeObject(Roles));
        }

        public static bool Has_null_attributes(Rol r)
        {
            if (r.Nombre is null | r.Descripcion is null)
                return true;
            return false;
        }

    }
}