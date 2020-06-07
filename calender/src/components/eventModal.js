import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core'
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid, Button, TextField } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import * as actions from '../actions/masterActions';

import tz from 'moment-timezone'
const EventModal = (props) => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const useStyles = makeStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    })

    )

    const classes = useStyles()
    const [eventName, handleEventName] = useState("");

    const handleCreateEvent = () => {
        let selectedDate = moment.unix(state.appData.selectedDate);
        let obj = (selectedDate.date().toString()+"-"+selectedDate.month().toString()+"-"+selectedDate.year().toString())
        console.log(obj, selectedDate)
        let events = state.appData.events;
        if(state.appData.events[0][obj]){
            events[0][obj].push({"name": eventName, "date": state.appData.selectedDate})
            console.log(events)
        }
        else{
            events[0][obj] = [{"name": eventName, "date": state.appData.selectedDate}]
            console.log(events)
        }
        dispatch(actions.addEventAction(events))
        props.handleModalOpen(false)
    }
    console.log(eventName)
    return(
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        // open={!isButtonvalue}
        open={props.modalOpen}
        // open={props.warningModal}
        // onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500
        }}
        disableBackdropClick={true}
    >
        <Fade in={props.modalOpen} className="modal-dialog alert-modal">
            <Grid className="modal-content" container>
                <Grid item xs={12}>
                    <h3>Create Event</h3>
                </Grid>
                <Grid item xs={12}>
                <TextField id="standard-basic" label="Enter event name" fullWidth value={eventName} onChange={(e) => handleEventName(e.target.value)} />

                </Grid>
                <Grid item xs={12} className="modal-btns">
                    <Button className="btn cancel-btn" onClick={() => props.handleModalOpen(false)}>Cancel</Button>
                    <Button className="btn create-btn" onClick={handleCreateEvent}>Create</Button>
                </Grid>
                {/* </Grid> */}
            </Grid>
        </Fade>
    </Modal>
    )
}

export default EventModal;