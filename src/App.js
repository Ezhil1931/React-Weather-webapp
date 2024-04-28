
import './App.css';


import {FaSun,FaCloudSun,FaCloudShowersHeavy ,FaSearch,FaRegSnowflake,FaWind,FaCloud} from "react-icons/fa";
import{ LuWaves} from "react-icons/lu";
import {IoMdRainy} from "react-icons/io";
import { useEffect, useState } from 'react';

const Weather=({icon,temp,city,country,lat,log,wind,hum})=>{
  
  return<>
  
  <div className='icon'>
{icon}
  </div>
<div className='temp'>
 {temp}°C

</div>
<div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
<div className='lattitude'>Lattitude:{lat}</div>
<div className='longtitude'>Longtitude:{log}</div>
  </div>
  <div className='data-all'>
    <div className='element'>
<span><LuWaves/></span>
<div className='data'>{hum}%</div>
  <div className='text'>Humidity</div>
    </div>

    <div className='element'>
 <span><FaWind/></span>
<div className='data'>{wind}km/h</div>
  <div className='text'>Wind Speed</div>
    </div>
  </div>
  <p id='my-name'>Designed by <a href='https:/www.linkedin.com/in/ezhil-arasan007' target='blank'>Ezhil</a></p>
  </>


}

function App() {
const [icon,setIcon] =useState(<FaSun/>)
const [temp,setTemp]=useState(0)
const [city,setCity]=useState("Chennai")
const [country,setCountry]=useState("Ind")
const [lat,setLat]=useState(0);
const [log,setLog]=useState(0);
const[text,setText]=useState("Chengalpattu");

const [wind,setWind]=useState(0);
const [hum,setHum]=useState(0);
let[not,setNot]=useState(false);
const weatherIcon={

  "01d":<FaSun/>,
  "01n":<FaSun/>,
  "02d":<FaCloudSun/>,
  "02n":<FaCloudSun/>,
  "03d":<FaCloudShowersHeavy/>,
  "03n":<FaCloudShowersHeavy/>,
  "04d":<FaCloudShowersHeavy/>,
  "04n":<FaCloudShowersHeavy/>,
  "09d":<IoMdRainy/>,
  "09n":<IoMdRainy/>,
  "10d":<IoMdRainy/>,
  "10n":<IoMdRainy/>,
  "13d":<FaRegSnowflake/>,
  "13n":<FaRegSnowflake/>

}


const search= async()=>{
 
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=109c52001428bf66fd7fdac7ba079556&units=Metric`;
try{

  const res=await fetch(url);
const data= await res.json();

if(data.cod==="404"){
  setNot(true);
}

setWind(data.wind.speed);
setHum(data.main.humidity);
setTemp(Math.floor(data.main.temp));
setCountry(data.sys.country);
setLat(data.coord.lat);
setLog(data.coord.lon);
const weatherCode=data.weather[0].icon;
setIcon(weatherIcon[weatherCode]||<FaSun/>);
setCity(text);

setText("")

}
catch(err){
console.error(err.message);
}

}

const handleEnter=(e)=>{

  if(e.key==="Enter"){
    search();
  }

}
useEffect(()=>{

search()

},[])

return (
    <div className="container">
      <h2><FaCloud className='cld'/><span> Weather Finder </span><FaCloud className='cld'/></h2>
<div className='input'>
<input type='text'
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder='enter the city'
onKeyDown={(e)=>handleEnter(e)}
/>

<span><FaSearch onClick={()=>search()}/>
</span>
</div>
{not&&<div className='msg'>
  <button onClick={()=>setNot(false)}>X</button>
<h3>City not found.Enter the correct cityname.</h3>
</div>
}

<Weather
icon={icon}
temp={temp}
city={city}
country={country}
lat={lat}
log={log}
wind={wind}
hum={hum}

/>

    </div>
  );

}

export default App;
