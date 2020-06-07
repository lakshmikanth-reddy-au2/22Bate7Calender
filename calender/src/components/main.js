import React, { useState, useEffect } from 'react';
import {Grid, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Toolbar from './toolbar';
import SideMenu from './sideMenu';
import TableSection from './tableSection';
import * as actions from '../actions/masterActions';
import moment from 'moment';

function Main() {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let date = state.appData.date;
    let year = date.getFullYear();
    let month = date.getMonth();
    let weeknumber = moment(date).week();
    dispatch(actions.yearChangeAction(year));
    dispatch(actions.monthChangeAction(month));
    dispatch(actions.weekChangeAction(weeknumber))
  }, [])
  console.log(state)
  return (
    <div className="app">
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <SideMenu />
        </Grid>
        <Grid item xs={9} className="main-sec">
          <TableSection />
        </Grid>
      </Grid>
      
    </div>
  );
}

export default Main;
