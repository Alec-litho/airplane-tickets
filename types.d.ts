
declare interface ITicket {
    "origin": string,
    "origin_name": string,
    "destination": string,
    "destination_name": string,
    "departure_date": string,
    "departure_time": string,
    "arrival_date": string,
    "arrival_time": string,
    "carrier": string,
    "stops": number,
    "price": number
}
declare interface IOption {
    desc: string,
    value: number | null, 
    on:boolean
}

declare interface ISideBarProps {filters:IOption[], setFilters:React.Dispatch<React.SetStateAction<any>>}