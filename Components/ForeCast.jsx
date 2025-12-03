import React from "react";

const ForeCast = ({ forecastWeather, location }) => {
    return (
        <div className="Container mt-5">
            <h4 className="text-white text-center">Forecast Weather of {location.name},{location.region}</h4>

            {/* list the forecast weather for clicked city */}
            {forecastWeather.forecastday.map((data, index) => {
                return (
                    <div className="accordion accordion-flush mt-3" id="accordionFlushExample">
                        {/* create a accordion like (dropdown) */}
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                    <div className="row mb-3">
                                        {/* show the data from the API */}
                                        <div className="p-2 col-lg-5 col-md-6 col-sm-12 mt-4">Day : {data.date}</div>
                                        <div className="p-2 col-lg-2 col-md-6 col-sm-12 mt-3"><img src={data.day.condition.icon} /></div>
                                        <div className="p-2 col-lg-2 col-md-6 col-sm-12 mt-4">{data.day.condition.text}</div>
                                        <div className="p-2 col-lg-3 col-md-6 col-sm-12 mt-4">Max temp : {data.day.maxtemp_c}</div>
                                    </div>
                                </button>
                            </h2>
                            <div id={`${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    {/* get the temperature from API for each hour */}
                                    {data.hour.map((data) => {
                                        return (
                                            <>
                                            <h6>{data.time}  Max temp : {data.temp_c} <img src={data.condition.icon} /></h6>
                                            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width :`${data.temp_c}%`}}>{data.temp_c}%</div>
                                            </div>
                                            </>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// export the forecast component to App.jsx
export default ForeCast;