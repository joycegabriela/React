import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import Button from './Componentes/Buttons';

function App() {
  const [selecionarCidade, setSelecionarCidade] = useState("");
  const [temperatura, setTemperatura] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [clima, setClima] = useState(null);
  const [pais, setPais] = useState(null)

  const handleSelect = (event) => {
    const cidade = event.target.value; //atualiza
    setSelecionarCidade(cidade);
  };

  const fetchData = async () => {
    try {
      const responder = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selecionarCidade}&appid=09bd759a20653a5f981dc189e6f95d8d&lang=pt`);
      const temperaturaAtual = (responder.data.main.temp - 273).toFixed(0);
      const umidadeAtual = responder.data.main.humidity;
      const climaAtual = responder.data.weather[0].description;
      const paisAtual = responder.data.sys.country

      setTemperatura(temperaturaAtual);
      setUmidade(umidadeAtual);
      setClima(climaAtual);
      setPais(paisAtual)

      if(temperaturaAtual <=22){ 
        document.body.style.backgroundColor = '#0000FF'
       } else{
        document.body.style.backgroundColor = '#FF0000'
      }
      } catch (error) {

      setTemperatura("Erro ao obter dados. Verifique a cidade.")
      setUmidade("Erro ao obter dados. Verifique a cidade.")
      setClima("Erro ao obter dados. Verifique a cidade.")
      setPais("Erro ao obter dados. Verifique a cidade.")
    }
    
  };
  return (
    <>
      
      <main id="bloco">
        <h1 id="titulo" >Clima Atual</h1>
        <input  type="text" onChange={handleSelect} placeholder='Digite sua cidade....' />
        <br />

        <Button
          nome="Pesquisar"
          repruduzir={fetchData}
        />

        {temperatura !== null && <div id='resultado'><p>Temperatura: {temperatura}°C</p></div>}
        {umidade !== null && <div id='resultado'><p>Umidade: {umidade}%</p></div>}
        {clima !== null && <div id='resultado'><p>Clima: {clima}</p></div>}
        {pais !== null && <div id='resultado'><p>País: {pais}</p></div>}
      </main>

    </>
  );
}

export default App;
