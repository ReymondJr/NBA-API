import { useEffect, useState } from "react";
import axios from "axios"
import Tabla from "../components/tabla";

export const Api = () =>{
    const [data, setData] = useState([]);

    useEffect(() => {
        //llamada a la api para recibir los datos
        axios.get("https://free-nba.p.rapidapi.com/players?page=1&per_page", {
        headers: {
            'X-RapidAPI-Key': '165aea4f14mshe514430abfe82bdp14a520jsn7fc1b9e777fc',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    }).then(response => {
        const PlayerDatos = response.data.data.map(item => ({
            nombre: `${item.first_name} ${item.last_name}`,
            city: item.team.city,
            equipo: item.team.full_name,
            altura: `${item.height_feet} ${item.height_inches}` 
        }));
        setData(PlayerDatos);
    //Ahora veremos lo que tenemos en la api
    console.log(PlayerDatos)
    console.table(response.data.data)
     })
     .catch(error => console.log(error))
    }, []);

    return(
        <>
            <Tabla datos ={data} />
        </>
        )
}