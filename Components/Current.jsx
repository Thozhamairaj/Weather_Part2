import React from "react";

const Current=({currentWeather, location})=>{
    return(
        <div className="Container mt-5">
            <h4 className="text-white text-center">Current Weather of {location.name},{location.region}</h4>

            <div className="row">
                {/* col 1 */}
                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div className="card w-100 h-100 bg-light bg-gradient bg-opacity-75">
                        <div className="card-body">
                            <h5 className="card-title">
                            <div className=" p-2 text-center bg-info rounded border border-info w-100 h-100">
                                 <img src={currentWeather.condition.icon} alt="..."/>
                                    {currentWeather.condition.text}
                                    </div>
                                 </h5>
                        </div>
                    </div>         
                </div>     
            
                {/* col 2 */}
                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div className="card w-100 h-100 bg-light bg-gradient bg-opacity-75">
                        <div className="card-body">
                            <h5 className="card-title">
                                   <div className="p-2 text-center bg-info rounded border border-info w-100 h-100 mt-3">Temp (in c) : {currentWeather.temp_c}'</div></h5>
                        </div>
                    </div>         
                </div>         

            
                {/* col 3 */}
                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div className="card w-100 h-100 bg-light bg-gradient bg-opacity-75">
                        <div className="card-body">
                        <h5 className="card-title">
                        <div className="p-2 text-center bg-info rounded border border-info w-100 h-100 mt-3">Temp (in f) : {currentWeather.temp_f}'</div></h5>
                        </div>

                    </div>
                </div>

           
                {/* col 4 */}
                <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div className="card w-100 h-100 bg-light bg-gradient bg-opacity-75" >
                        <div className="card-body">
                            <h5 className="card-title">
                            <div className="p-2 text-center bg-info rounded border border-info w-100 h-100 mt-4">Humidity : {currentWeather.humidity}</div></h5>
                        </div>
                    </div>
                </div>
        </div>
        </div>

        
    )
}

// export the current component to App.jsx
export default Current;