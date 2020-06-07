import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import WeekView from './weekView';
import MonthView from './monthView';
import { useSelector } from 'react-redux';
// import "react-big-calendar/lib/css/react-big-calendar.css";

const TableSection = (props) => {

    const state = useSelector(state => state);

    return(
        <div className="tab-sec">
            {state.appData.view === "month" ? <MonthView /> : <WeekView />}
            {/* <WeekView /> */}
            
        </div>
    )
}

export default TableSection;