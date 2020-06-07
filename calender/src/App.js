import React, { useState, useEffect } from 'react';
import Main from './components/main';
// import {Grid, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import './App.css';
// import { useSelector, useDispatch } from 'react-redux';
// import Toolbar from './components/toolbar';
// import SideMenu from './components/sideMenu';
// import TableSection from './components/tableSection';
// import * as actions from '../actions/masterActions';
// import moment from 'moment';

function App() {

  // const state = useSelector(state => state);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   let date = new Date();
  //   let year = date.getFullYear();
  //   let month = date.getMonth();
  //   let weeknumber = moment(date).week();
  //   dispatch(actions.yearChangeAction(year));
  //   dispatch(actions.monthChangeAction(month));
  //   dispatch(actions.weekChangeAction(weeknumber))
  // }, [])
  // console.log(state)
  return (
    <div>
      {/* <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <SideMenu />
        </Grid>
        <Grid item xs={9} className="main-sec">
          <TableSection />
        </Grid>
      </Grid> */}
      <Main />
    </div>
  );
}

export default App;
