using API.Models;
using Newtonsoft.Json;
using System.IO;
using System.Collections.Generic;

public static class JSONManager
{
    // Carga los datos de una base de datos y los devuelve como un json en un string
    public static string loadDB_string(string db_name){
        string path = @"JSON_FILES\"+db_name+".json";
        return File.ReadAllText(path);
    }
    

}