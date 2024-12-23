import React from "react"
import "../style/sidebar.css"

export function SideBar({filters, setFilters}:ISideBarProps) {

    function handleFiltersChange(e: any) {
        let p = [...e.target.parentNode.childNodes][1]//get <p> tag
        let target = filters.filter(option => option.desc === p.innerText)[0]
        setFilters((prev:IOption[]) => {
            if(target.value===null) return prev.map(filter => {return {...filter, on: target.on? false : true}})
            return prev.map((filter:IOption) => {return {...filter, on: filter.desc === target.desc ? !filter.on : filter.on}})
        })
        return 
    }
    function setOnlyFilter(e:any) {
        let p = [...e.target.parentNode.childNodes][0]
        let target = filters.filter(option => option.desc === p.innerText)[0]
        setFilters((prev:IOption[]) => {
            return prev.map((filter:IOption) => {return {...filter, on: filter.desc === target.desc ? true : false}})
        })
    }
    
    function onOptionHover(e:any) {
        if(e.target.className!=="title") return
        e.target.className = "titleOn"
    }
    function onOptionHoverEnd(e:any) {
        if(e.target.className!=="titleOn") return
        e.target.className = "title"
    }
    return (
        <div className="sidebar">
        <div className="currency-block">
            <h3>ВАЛЮТА</h3>
            <div className="currency-options">
              <button className="currency-option">RUB</button>
              <button className="currency-option">USD</button>
              <button className="currency-option">EUR</button>
            </div>
        </div>
        <div className="stops-block">
            <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
            <ul className="stop-options">
                {filters.map((option,indx) => {
                    console.log("updated",option)
                    return (
                        // Because stopOptions array is static we can use indexes as keys
                        <li key={indx} className="stop-option">
                            <input type="checkbox" checked={option.on} className="checkmark" onClick={handleFiltersChange}/>
                            <div className="title" onMouseEnter={onOptionHover} onMouseLeave={onOptionHoverEnd}>
                                <p>{option.desc}</p>
                                <p className="onhover" onClick={setOnlyFilter}>ТОЛЬКО</p>
                            </div>
                          
                        </li>
                    )
                })}
                
            </ul>
        </div>
      </div>
    )
}