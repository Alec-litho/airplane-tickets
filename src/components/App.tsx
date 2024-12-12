import React, {useEffect, useState} from 'react';
import '../style/App.css';
import { throttle } from '../helpers/throttle';
import data from "../tickets.json"
import { Ticket } from './Ticket';
import { SideBar } from './SideBar';

function App() {
  let [allTickets, setAllTickets] = useState<ITicket[] | []>(() => (data.tickets.sort((a,b) => a.price - b.price)))
  let [tickets, setTickets] = useState<ITicket[] | []>([])
  let [filters, setFilters] = useState<IOption[]>([
      {desc: "Все", value: null, on:false},
      {desc: "Без пересадок", value: 0, on:true},
      {desc: "1 пересадка", value: 1, on:false},
      {desc: "2 пересадки", value: 2, on:false},
      {desc: "3 пересадки", value: 3, on:false}
    ])

  useEffect(() => {
    setTickets(filterTickets(allTickets).slice(0,4))
    window.addEventListener("scroll", loadMoreTickets)
    return () => {
      window.removeEventListener("scroll", loadMoreTickets)
    }
  },[filters])
  
  function filterTickets(tickets:ITicket[]):ITicket[] {
    let filtersOn = filters.filter(filter => filter.on)
    let filtered = tickets.filter((ticket) => {
      let pass = false
      filtersOn.forEach(f => {
        if(f.value === ticket.stops || f.value === null) pass = true
      })
      return pass
    })
    return filtered
  }

  function loadMoreTickets():void {
    throttle(() => {
      const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      if (endOfPage) {
        setTickets(prev => {
          let next = filterTickets(allTickets).slice(prev.length, prev.length+4)
          return [...prev, ...next]
        })
      }
    }, 1000);
  }
  function generateId(start:number | string, middle:number | string, end:number | string):string {
    return start.toString() + middle + end.toString().split(":").join("")
  }

  return (
    <div className="App">
      <div className="header">
        <img src={require("../assets/airport.png")} alt="" />
      </div>
      <div className="body">
      <SideBar filters={filters} setFilters={setFilters}/>
      <div className="main">
        {tickets.map((ticket:ITicket) => {
          return <Ticket {...ticket} key={generateId(ticket.price,ticket.departure_time,ticket.arrival_time)}/>
        })}
      </div>
      </div>     
    </div>
  );
}

export default App;

