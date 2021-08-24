using API.Models;
using System.Collections.Generic;
using System.Linq;

namespace API.Services
{
    public static class RolService
    {
        static List<Rol> Roles { get; }
        static RolService()
        {
            Roles = new List<Rol>
            {
                new Rol { Nombre = "Negocio", Descripcion = "Es una persona que sabe estafar."},
                new Rol { Nombre = "Gasto", Descripcion = "Realiza el analisis de gastos empresariales." }
            };
        }
        // Obtiene todos los roles.
        public static List<Rol> GetAll() => Roles;


        // Obtiene el rol que coincida con el nombre deseado.
        public static Rol Get(string nombre) => Roles.FirstOrDefault(p => p.Nombre == nombre);

        // Agrega un nuevo rol a la lista de roles.
        public static void Add(Rol rol)
        {   
            Roles.Add(rol);
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

        // Elimina un rol de la lista de roles.
        public static void Delete(string nombre)
        {
            var rol = Get(nombre);
            if(rol is null)
                return;

            Roles.Remove(rol);
        }                    

        // Modifica un rol de la lista de roles.
        public static void Update(Rol rol)
        {
            var index = Roles.FindIndex(p => p.Nombre == rol.Nombre);
            if(index == -1)
                return;
            Roles[index] = rol;
        }



    }
}