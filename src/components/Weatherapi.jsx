import React, { useEffect, useState } from 'react';
import './App.css';
import bgimage1 from '../Images/bg1.jpg';
import bgimage2 from '../Images/haze.jpg';
import bgimage3 from  '../Images/rain1.jpg';
import bgimage4 from '../Images/clouds.jpg';
import axios from 'axios';
const Weatherapi = () => {
    let [wicons,updatewicons]=useState();
    let [bgimg, upadatebgimg] = useState(bgimage1);
    let [weather1, updateweather] = useState([]);
    let [loc, updateloc] = useState("");
    let [dtime,updatedtime]=useState();
    let tday=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let tmonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    setInterval(()=>{
        function showtime(){
            updatedtime(new Date());
        }
        showtime();
    })
    useEffect(() => {
        async function show(event) {
            let d = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=indore&appid=b587468196cae7385f6ba96548cca465`);
            updateweather([d.data]);
            console.log(d.data);
            if(d.data.weather[0].main==="Haze"){
                upadatebgimg(bgimage2);
                updatewicons("fa-wind")
            }
            else if(d.data.weather[0].main==="Rain")
            {
                upadatebgimg(bgimage3);
                updatewicons("fa-cloud-showers-heavy")
            }
            else if(d.data.weather[0].main==="Clouds")
            {
                upadatebgimg(bgimage4);
                updatewicons("fa-cloud")
            }
            else{
                upadatebgimg(bgimage1);
                updatewicons("fa-sun")
            }
        }
        show();
    },[])
    function getloc(event) {
        updateloc(event.target.value);
    }
    async function weatherShow(event) {
        console.log(loc);
        event.preventDefault();
        let d = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=0d865df7b0cd0d93f9ef907c71a19390`);
        updateweather([d.data]);
        if(d.data.weather[0].main==="Haze"){
            upadatebgimg(bgimage2);
            updatewicons("fa-wind")
        }
        else if(d.data.weather[0].main==="Rain")
        {
            upadatebgimg(bgimage3);
            updatewicons("fa-cloud-showers-heavy")
        }
        else if(d.data.weather[0].main==="Clouds")
        {
            upadatebgimg(bgimage4);
            updatewicons("fa-cloud")
        }
        else{
            upadatebgimg(bgimage1);
            updatewicons("fa-sun")
        }

    }
    return (
        <>
            <div className="container-fluid vh-100  bgimages" style={{ backgroundImage: `url(${bgimg})` }}  >
                <div className="searchbar row weather_info ">
                    <div className="col-10 col-md-11">
                        <input type="text" className=" search_input  h-100 w-100 text-muted " value={loc} onChange={getloc} placeholder="Enter loaction..." />
                    </div>
                    <div className="col-2 col-md-1 p-0">
                        <button className="btn btn-danger h-100 w-100 " onClick={weatherShow}>
                            <i className="fas fa-search fa-2x"></i>
                        </button>
                    </div>
                </div>
                {
                    weather1.map((val) => {
                        return (
                            <div className="detailbar row ">
                                <div className="col-lg-8  maintemp">
                                    <div className="container  text-capitalize d-flex align-items-center">
                                        <span>
                                            <h1 className=" main_temp font-weight-bolder text-white">{Math.ceil(val.main.temp - 273.15)}<sup>o</sup></h1>
                                        </span>
                                        <span className="text-capitalize text-white">
                                            <h1 className="p-0 m-0">{val.name}</h1>
                                            <h5 className="p-0 m-0">{dtime.getHours()}:{dtime.getMinutes()}-{tday[dtime.getDay()]} {dtime.getDate()} {tmonths[dtime.getMonth()]} {dtime.getFullYear()}</h5>
                                        </span>
                                        <span className="text-white mx-2 mt-2">
                                            <i className={`fas ${wicons} fa-3x`}></i>
                                            <h5> {val.weather[0].main}</h5>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-4 weather_info">
                                    <div className="container">
                                        <div className="mt-4">
                                            <h4 className="text-white">Weather Details</h4>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-3 text-light">
                                            <h6>Cloudy</h6>
                                            <h6>{val.clouds.all}%</h6>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-2 text-light">
                                            <h6>Humidity</h6>
                                            <h6>{val.main.humidity}%</h6>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-2 text-light">
                                            <h6>Feels_like</h6>
                                            <h6>{Math.ceil(val.main.feels_like - 273.15)}<sup>o</sup>C</h6>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-2 text-light">
                                            <h6>Pressure</h6>
                                            <h6>{val.main.pressure}</h6>
                                        </div>
                                        <hr className="bg-white font-weight-bolder" />
                                        <div className="mt-2">
                                            <h4 className="text-white">Temperature</h4>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-3 text-light">
                                            <h6>Temp-max</h6>
                                            <h6>{Math.ceil(val.main.temp_max - 273.15)}<sup>o</sup>C</h6>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-2 text-light">
                                            <h6>Temp-min</h6>
                                            <h6>{Math.ceil(val.main.temp_min - 273.15)}<sup>o</sup>C</h6>
                                        </div>
                                        <hr className="bg-white font-weight-bolder" />
                                        <div className="mt-2">
                                            <h4 className="text-white">Wind</h4>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-3 text-light">
                                            <h6>Speed</h6>
                                            <h6>{val.wind.speed} meter/sec</h6>
                                        </div>
                                        <div className="d-flex justify-content-between px-1 mt-2 text-light">
                                            <h6>degree</h6>
                                            <h6>{val.wind.deg}<sup>o</sup></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Weatherapi;
