import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  //STATE PRINCIPAL

  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(()=>{

    //PREVENIR LA EJECUCION. 
    if(ciudad === '') return;

    const consultarAPI = async () => {
      const appId = '';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      //CONSULTAR LA URL 
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
          
      guardarResultado(resultado);
    }
    consultarAPI();
  }, [ ciudad, pais ]);

  const datosConsulta = datos => {
    //VALIDAR QUE AMBOS CAMPOS ESTEN COMPLETOS.
    if(datos.ciudad === '' || datos.pais === ''){
      guardarError(true);
      return;
    }
    
    //CIUDAD Y PAIS EXISTEN, AGREGARLOS AL STATE.
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais); 
    guardarError(false);
  }



  //CARGAR UN COMPONENTE CONDICIONALMENTE
  let componente;
  if(error){
    //HAY UN ERROR, MOSTRARLO.
    componente = <Error mensaje='Ambos campos son requeridos'/>
  }
  else if(resultado.cod === "404"){
    componente = <Error mensaje="La ciudad no existe en nuestro registro"/>
  }
  else{
    //MOSTRAR EL CLIMA
    componente = <Clima
                    resultado={resultado}
                  />;
  }

  return (
    <div className="App">
      <Header 
        titulo= 'Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta = {datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
