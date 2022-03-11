import React, { useState } from 'react';
import axios from 'axios';
import { IMyBookings } from '@/types/bookingTypes';


const MyBookings = () => {
    const [isLoading, setIsLoading] =useState<boolean>(false)
    const [myBookings, setMyBookings] =useState<IMyBookings[]>([])
    

    async function refreshMyBookings() {
        setIsLoading(true)
        let access_token = localStorage.getItem('access_token')
        let bookings = await axios.post('http://garpixams.staging.garpix.com/api/v1/reserves/read', {},
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }).then((response)=>response.data)
            .catch((error) => console.log(error))
            .finally(()=>setIsLoading(false))

        if(bookings) {
            setMyBookings(bookings)
        }    
    }

    function correctTime(num:number): string {
        if(num<10) {
            return("0"+num)
        }
        return num.toString() 
    }

    return (
        <div>
            <button onClick={refreshMyBookings}>обновить</button>
            <div>
                {isLoading && <h2>идет загрузка...</h2>}
                {myBookings.length < 1
                 ? <h2>на данный момент список бронирований пуст</h2>
                 :  myBookings.map((booking)=>{
                    let start = new Date(booking.startDate)
                    let finish = new Date(booking.endDate)
                    return(
                        <fieldset key={booking.id}>
                                <h3>{booking.roomId.title}</h3>
                                <h5>{booking.roomId.description}</h5>
                                Начало в {correctTime(start.getHours())}:{correctTime(start.getMinutes())} <br/>
                                Конец в {correctTime(finish.getHours())}:{correctTime(finish.getMinutes())} <br/> 
                        </fieldset>
                    )
                })}
            </div>
        </div>
    );
};

export default MyBookings;