import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as actions from '../actions/masterActions';
import { useSelector, useDispatch } from 'react-redux';
import EventModal from './eventModal';

const MonthView = (props) => {

    const moment = extendMoment(Moment);
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [weeks, setWeeks] = useState([]);
    const Days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]
    const dayCount = [0,1,2,3,4,5,6]
    let events = { 
           "7-5-2020":[ {
            "name": "Bday party",
            "date": 1591519482
        }]
    }
    let holidays = { 
        "7-5-2020":[ {
         "name": "Navami",
         "date": 1591519482
     }]
 }
 const [modalOpen, handleModalOpen] = useState(false);
 const handleEventClick = (day) => {
     console.log(day.getTime()/1000.0)
     dispatch(actions.selectedDateAction(day.getTime()/1000.0))
    handleModalOpen(true);
}
    useEffect(() => {
        let arr = [];
        let endMonth = state.appData.month === 11 ? 0 : state.appData.month+1;
        let startDate = moment.utc([state.appData.year, state.appData.month])
        let endDate = moment.utc([state.appData.month === 11 ? state.appData.year+1 : state.appData.year, endMonth])
        let firstDay = moment(startDate).startOf('week')
        let endDay = moment(endDate).endOf('week');
        let monthRange = moment.range(firstDay, endDay);
        // console.log("here", endMonth, state.appData.year, state.appData.month, startDate, endDate, firstDay, endDay, monthRange )
        for (let mday of monthRange.by('days')) {
            // console.log(mday, mday.week(), mday._d)
            if(arr[mday.week()] || arr['53']){
                if(arr['53']){
                    arr['53'].push(mday._d)
                }
                else{
                    arr[mday.week()].push(mday._d)
                }
            }
            else{
                if(mday.week() === 1 && state.appData.month === 11 ){
                    arr['53'] = [mday._d]
                }
                else{
                    arr[mday.week()] = [mday._d]
                }
            }
          }
          setWeeks(arr)
    }, [state.appData.month])
    
    // console.log(weeks)
    // console.log(state.appData.events['12-5-2020'][0].date.hour())
    return(
        <div className="mon-vw">
            <table>
                <thead>
                    <tr>
                        {Days.map((day, i) => (
                            <th key={i} className="mth-top-cell">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weeks && weeks.map((week, i) => (
                        <tr key={i}>
                            {dayCount.map((day, i) => (
                                <td className={week[day].getMonth() !== state.appData.month ? "mth-top-cell dif-mnth": "mth-top-cell"} onClick={() => handleEventClick(week[day])}>{week[day].getDate()}
                                {state.appData.holidays[week[day].getDate().toString()+"-"+week[day].getMonth().toString()+"-"+week[day].getFullYear().toString()] && state.appData.checkboxes["holidays"] &&
                                    state.appData.holidays[week[day].getDate().toString()+"-"+week[day].getMonth().toString()+"-"+week[day].getFullYear().toString()].map((holiday, i) => {
                                        return(
                                        <div className="holiday">{holiday.name}</div>
                                        )}
                                    )
                                    }
                                {state.appData.events[0][week[day].getDate().toString()+"-"+week[day].getMonth().toString()+"-"+week[day].getFullYear().toString()] && state.appData.checkboxes["events"] &&
                                    state.appData.events[0][week[day].getDate().toString()+"-"+week[day].getMonth().toString()+"-"+week[day].getFullYear().toString()].map((eve, i) => {
                                        return(
                                            i<2 && 
                                        <div className="event">{eve.name}</div>
                                        )}
                                    )
                                    }
                                
                                </td>
                            ))}
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <EventModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} />

        </div>
    )
}

export default MonthView;