import React, { useState } from 'react';
import Calendar from 'react-calendar';
import {FormControlLabel, Checkbox} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
// import 'react-calendar/dist/Calendar.css';
import * as actions from '../actions/masterActions';


const SideMenu = () => {

    const GreenCheckbox = withStyles({
        root: {
          color: green[400],
          '&$checked': {
            color: green[600],
          },
        },
        checked: {},
      })(props => <Checkbox color="default" {...props} />);
      const state = useSelector(state => state);
      const dispatch = useDispatch();
    const [value, onChange] = useState(new Date());
    const [checkboxes, handleCheckBoxes] = useState({
        "events": true,
        "holidays": true
    })

    const handleCheckChange = val => e => {
        handleCheckBoxes({...checkboxes, [val]: e.target.checked});
        let payload = {...state.appData.checkboxes, [val]: e.target.checked};
        dispatch(actions.checkBoxesAction(payload));
    }
    console.log(value)
    return(
        <div className='side-menu'>
            <div>
                <Calendar
                    prev2Label={null} 
                    next2Label={null}
                    onChange={onChange}
                    value={value}
                    onViewChange={({ activeStartDate, value, view }) => alert('New view is: ', view)}
                    // formatShortWeekday={(locale, date) => formatDate(date, 'd')}
                />
            </div>
            <div className="checks">
                <div className="checks-head">
                    <span>My Calenders</span>
                </div>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={checkboxes.events}
                        onChange={handleCheckChange('events')}
                        value="events"
                        color="primary"
                    />
                    }
                    label="Events"
                />
                <FormControlLabel
                    control={
                    <GreenCheckbox
                        checked={checkboxes.holidays}
                        onChange={handleCheckChange('holidays')}
                        value="holidays"
                    />
                    }
                    label="Holidays"
                />
            </div>
            
        </div>
    )
}

export default SideMenu;