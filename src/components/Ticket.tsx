import React from "react"
import "../style/ticket.css"
export function Ticket(data: ITicket) {


    return (
        <div className="ticket">
            <div className="leftSide">
                <img src={require('../assets/turkish_airlines.png')} alt="#" className="companyLogo" />
                <button className="buy">Купить<br/> за {data.price} ₽</button>
            </div>
            <div className="border"></div>

            <div className="rightSide">
                <div className="origin">
                    <h1 className="time">{data.departure_time}</h1>
                    <h4 className="originName">{data.origin_name}</h4>
                    <p>{data.departure_date}</p>
                </div>
                <div className="stops">
                    <p>{data.stops}{data.stops===0 || data.stops>4? " ПЕРЕСАДОК" : data.stops===1? " ПЕРЕСАДКA" :" ПЕРЕСАДКИ"}</p>
                    <div className="airplane">
                        <div className="line"></div>
                        <img className="airplaneLogo" src={require('../assets/airplane.png')} alt="#" />
                    </div>
                </div>
                <div className="destination">
                    <h1 className="time">{data.arrival_time}</h1>
                    <h4 className="destinationName">{data.destination_name}</h4>
                    <p>{data.departure_date}</p>
                </div>
            </div>
        </div>
    )
}