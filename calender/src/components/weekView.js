import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector , useDispatch} from 'react-redux';
import EventModal from './eventModal';
import * as actions from '../actions/masterActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const WeekView = (props) => {

    
    let state = useSelector(state => state);
    const dispatch = useDispatch();

    // let date = new Date("06-07-2020");
    // let year = date.getFullYear();
    // let month = date.getMonth();
    // let weeknumber = moment(date).week()
    const Days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]
    const times = [1, 2,3,4,5,6,7,8,9,10,11,12,1, 2,3,4,5,6,7,8,9,10,11]
    // let week =
    const [daysNumbers, setDayNumbers] = useState([]);
    const [modalOpen, handleModalOpen] = useState(false);
    const [selectedItemToDelete, handleDelectedItem] = useState("");

    const [open, handleOpen] = useState(false);
    useEffect(() => {
        getDays();
    }, [state.appData.week])
    const getDays = () => {
        let arr = [];
        let weeknumber = state.appData.week
        for(let i=0; i<7; i++){
            arr.push(moment().year(state.appData.year).month(state.appData.month).week(weeknumber).day(i)._d)
        }
        setDayNumbers(arr);
    }
    const handleEventClick = async (e, da, index) => {
        let date = moment([daysNumbers[index].getFullYear(), daysNumbers[index].getMonth(), daysNumbers[index].getDate(), e.target.id, daysNumbers[index].getMinutes(), daysNumbers[index].getSeconds() ])._d
        await dispatch(actions.selectedDateAction(date.getTime()/1000.0))
            handleModalOpen(true);
    }
    const deleteEvent = (event, i) => {
        console.log(i)
        handleDelectedItem(i);
        handleOpen(true)
        }
    const handleConfirm = () => {
        let events = state.appData.events;
        events[0][selectedItemToDelete].splice(0, 1)
        dispatch(actions.addEventAction(events));
        handleOpen(false)
    }
    const handleClose = () => {
        handleOpen(false)
    }
    console.log(selectedItemToDelete)
    return(
        <div className="wk-vw">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {daysNumbers.length>0 && daysNumbers.map((day, i) => (
                            <th className={state.appData.date.getDate() === day.getDate() ? "wk-top-cell cur-day" : "wk-top-cell"}>
                            {/* <div> */}
                                <span>{Days[i]}</span>
                                <h4>{day.getDate()}</h4>
                                <div>
                                {state.appData.holidays[daysNumbers[i].getDate().toString()+"-"+daysNumbers[i].getMonth().toString()+"-"+daysNumbers[i].getFullYear().toString()] && state.appData.checkboxes["holidays"] &&
                                    state.appData.holidays[daysNumbers[i].getDate().toString()+"-"+daysNumbers[i].getMonth().toString()+"-"+daysNumbers[i].getFullYear().toString()].map((holiday, i) => {
                                        return(
                                        <div className="holiday">{holiday.name}</div>
                                        )}
                                    )
                                    }
                                    </div>
                            {/* </div> */}
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time, ind) => (
                        <tr><td className="time-stamps">{time}{ind>10? "PM" : "AM"}</td>
                            {Days.map((day, i) => (
                                <td id={ind>11? time+12 : time} key={time+i} className="week-cell">
                                    {/* {console.log(daysNumbers[i])} */}
                                    {daysNumbers.length>0 && state.appData.events[0][daysNumbers[i].getDate().toString()+"-"+daysNumbers[i].getMonth().toString()+"-"+daysNumbers[i].getFullYear().toString()] && state.appData.checkboxes["events"] &&
                                    state.appData.events[0][daysNumbers[i].getDate().toString()+"-"+daysNumbers[i].getMonth().toString()+"-"+daysNumbers[i].getFullYear().toString()].length ?
                                    state.appData.events[0][daysNumbers[i].getDate().toString()+"-"+daysNumbers[i].getMonth().toString()+"-"+daysNumbers[i].getFullYear().toString()].map((eve, index) => {
                                        let timeNow = ind>11 ? time+12 : time;
                                        
                                        if(new Date(eve.date*1000).getHours() === timeNow){
                                            // console.log(eve, timeNow)
                                            return(
                                                index<2 &&
                                                <div className="event-inner-cell has-event" onClick={() => deleteEvent(eve, daysNumbers[i].getDate().toString()+"-"+daysNumbers[i].getMonth().toString()+"-"+daysNumbers[i].getFullYear().toString())}><h5>{eve.name}</h5></div>
                                                )
                                        }
                                        }
                                    ) : <div id={ind>11? time+12 : time}  className="event-inner-cell-empty" onClick={(e) => handleEventClick(e, time, i)}></div>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <EventModal modalOpen={modalOpen} handleModalOpen={handleModalOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Are you sure you want to delete event?</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    No
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default WeekView;