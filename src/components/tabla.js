import './datos.css'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Fab } from '@mui/material'

const Tabla = (props) => {
  const data = props.datos;

  const [searchValue, setSearchValue] =useState("");
  const [filteredData, setFilterData] = useState(data);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [num, setNum] = useState(1);

  const handleSearch1 = () => {
    // Realizar solicitud a la API cuando el componente se monte
    axios.get(`https://free-nba.p.rapidapi.com/players`,
    {
      params: {search: searchValue},
      headers: {
        'X-RapidAPI-Key': '165aea4f14mshe514430abfe82bdp14a520jsn7fc1b9e777fc',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }})
      .then((response) => {
        const jugador = response.data.data.map(item => ({
          nombre: `${item.first_name} ${item.last_name}`,
          city: item.team.city,
          equipo: item.team.full_name,
          altura: `${item.height_feet} ${item.height_inches}`
       
        }));
        setPlayerData(jugador);
        console.table(response.data.data)
        setFilterData(jugador);
      setSearchPerformed(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData()
  },[num])

   const fetchData = () => {
axios
  .get("https://free-nba.p.rapidapi.com/players", {
    params: {
      page: num
    },
    headers: {
      'X-RapidAPI-Key': '165aea4f14mshe514430abfe82bdp14a520jsn7fc1b9e777fc',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    }
  })
  .then(response => {
    const jugador = response.data.data.map(item => ({
      nombre: `${item.first_name} ${item.last_name}`,
      city: item.team.city,
      equipo: item.team.full_name,
      altura: `${item.height_feet} ${item.height_inches}`
   
    }));
    setPlayerData(jugador);
    console.table(response.data.data)
    setFilterData(jugador);
  setSearchPerformed(true);
  console.log(filteredData)
  })
  .catch(err => console.log(err));
};
const aumentar = () =>{
  setNum(num + 1);
}
const disminuir = () => {
  if(num > 1){
  setNum(num - 1);
}}
const cantidadDatos = filteredData.length;
console.log(cantidadDatos);

  return (

      <div style={{textAlign: "center"}}>
        <h1>NBA Players</h1>

        <input 
          className='search'
          type='search'
          placeholder='Buscar'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Button variant="contained"  color="success" onClick={handleSearch1}>Search</Button>

        <div style={{ position: "fixed", top: "20px", right: "20px" }}>
        <Fab size="small" color="secondary" aria-label="subtract" onClick={disminuir}>
        -
        </Fab>
        <label style={{ margin: "0 10px" }}>{num}</label>
        <Fab size="small" color="secondary" aria-label="add" onClick={aumentar}>
        +
        </Fab>
      </div>

        <table className="centered-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Altura</th>
            <th>Cuidad</th>
            <th>Equipo</th>
          </tr>
        </thead>
        

          <tbody>
          {searchPerformed
          ? filteredData.map((jugador, index) => (
              <tr key={index}>
                <td>{jugador.nombre}</td>
                <td>
                  {jugador.altura !== "null null"
                    ? jugador.altura
                    : "No disponible"}
                </td>
                <td>{jugador.city}</td>
                <td>{jugador.equipo}</td>
              </tr>
            ))
          : data.map((jugador, index) => (
              <tr key={index}>
                <td>{jugador.nombre}</td>
                <td>
                  {jugador.altura !== "null null"
                    ? jugador.altura
                    : "No disponible"}
                </td>
                <td>{jugador.city}</td>
                <td>{jugador.equipo}</td>
              </tr>
            ))}
            <tr>
      <td colSpan="4">Cantidad de Jugadores: {cantidadDatos}</td>
    </tr>
          </tbody>
        </table>
      </div>
    );

}
export default Tabla;