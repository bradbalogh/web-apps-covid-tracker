import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chart from 'chart.js';
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../css/app.css';
import image from '../images/coronavirus.png';
import image2 from '../images/data.png';
import useStyles from "../css/appDrw";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import { render } from 'react-dom';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const classes = useStyles()
  let query = useQuery()

  const USCoronaData = []
  const CovidData = []
  const [submitted, setSubmitted] = useState(false)
  const [USCoronaState, setUSCoronaState] = useState([])
  const [stateState, setstateState] = useState(0)
  const [StateData, setStateData] = useState([])
  const [open, setOpen] = useState(false);

  const encodedMessage = encodeURIComponent(StateData[0])

  const fetchUsData = async () => {
    const apiCall = await fetch('https://covidtracking.com/api/us')
    const data = await apiCall.json()

    USCoronaData.push(data[0].death)
    USCoronaData.push(data[0].recovered)
    USCoronaData.push(data[0].positive)
    USCoronaData.push(data[0].negative)
    USCoronaData.push(data[0].hospitalized)

    setUSCoronaState(USCoronaData)
    setSubmitted(true)

    //console.log(data)
    //console.log(coronaData)
  }
  const state = {
    labels: ['Deaths', 'Recovered', 'Hospitalized'],
    datasets: [
      {
        label: 'COVID-19',
        backgroundColor: [
          '#B21F00',
          '#2FDE00',
          '#FFA500'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#175000',
          '#FF8C00'
        ],
        data: [USCoronaState[0], USCoronaState[1], USCoronaState[4]]
      }
    ]
  }

  const state2 = {
    labels: ['Positive',
      'Negative'],
    datasets: [
      {
        label: 'COVID-19',
        backgroundColor: [
          '#FFC0CB',
          '#00A6B4'
        ],
        hoverBackgroundColor: [
          '#FF1493',
          '#003350'
        ],
        data: [USCoronaState[2], USCoronaState[3]]
      }
    ]
  }

  const state3 = {
    labels: ['Deaths', 'Recovered', 'Hospitalized'],
    datasets: [
      {
        label: 'COVID-19',
        backgroundColor: [
          '#B21F00',
          '#2FDE00',
          '#FFA500'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#175000',
          '#FF8C00'
        ],
        data: [StateData[1], StateData[2], StateData[5]]
      }
    ]
  }

  const state4 = {
    labels: ['Positive',
      'Negative'],
    datasets: [
      {
        label: 'COVID-19',
        backgroundColor: [
          '#FFC0CB',
          '#00A6B4'
        ],
        hoverBackgroundColor: [
          '#FF1493',
          '#003350'
        ],
        data: [StateData[2], StateData[3]]
      }
    ]
  }

  const fetchILData = async () => {
    const apiCall = await fetch('https://covidtracking.com/api/states')
    const data = await apiCall.json();
    console.log(data)

    CovidData.push(data[stateState].state)
    CovidData.push(data[stateState].death)
    CovidData.push(data[stateState].recovered)
    CovidData.push(data[stateState].positive)
    CovidData.push(data[stateState].negative)
    CovidData.push(data[stateState].hospitalized)

    setStateData(CovidData)
    console.log(CovidData)
    setSubmitted(true)
  }


  if (!submitted) {
    fetchUsData()
    fetchILData()
  }



  const handleChange = (event) => {
    setstateState(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("Submitted data " + stateState)
    fetchILData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Typography variant="h6" className={classes.title}>
            COVID-19 Data
          </Typography>
        </AppBar>
        <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button key="home">
                <Link to="/"> Home </Link>
              </ListItem>
              <ListItem button key="USData">
                <Link to="/USData">US Data</Link>
              </ListItem>
              <ListItem button key="stateData">
                <Link to={`/stateData?state=${encodedMessage}`}>State Data</Link>
                <Redirect push to={`/stateData?state=${encodedMessage}`}>State Data</Redirect>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route path="/stateData">
              <Typography paragraph>
                Choose a state or territory
                </Typography>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">State</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={stateState}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Alaska</MenuItem>
                  <MenuItem value={1}>Alabama</MenuItem>
                  <MenuItem value={2}>Arkansas</MenuItem>
                  <MenuItem value={3}>American Samoa</MenuItem>
                  <MenuItem value={4}>Arizona</MenuItem>
                  <MenuItem value={5}>California</MenuItem>
                  <MenuItem value={6}>Colorado</MenuItem>
                  <MenuItem value={7}>Connecticut</MenuItem>
                  <MenuItem value={8}>District of Columbia</MenuItem>
                  <MenuItem value={9}>Delaware</MenuItem>
                  <MenuItem value={10}>Florida</MenuItem>
                  <MenuItem value={11}>Georgia</MenuItem>
                  <MenuItem value={12}>Guam</MenuItem>
                  <MenuItem value={13}>Hawaii</MenuItem>
                  <MenuItem value={14}>Iowa</MenuItem>
                  <MenuItem value={15}>Idaho</MenuItem>
                  <MenuItem value={16}>Illinois</MenuItem>
                  <MenuItem value={17}>Indiana</MenuItem>
                  <MenuItem value={18}>Kansas</MenuItem>
                  <MenuItem value={19}>Kentucky</MenuItem>
                  <MenuItem value={20}>Louisiana</MenuItem>
                  <MenuItem value={21}>Massachusetts</MenuItem>
                  <MenuItem value={22}>Maryland</MenuItem>
                  <MenuItem value={23}>Maine</MenuItem>
                  <MenuItem value={24}>Michigan</MenuItem>
                  <MenuItem value={25}>Minnesota</MenuItem>
                  <MenuItem value={26}>Missouri</MenuItem>
                  <MenuItem value={27}>Northern Marianas</MenuItem>
                  <MenuItem value={28}>Mississippi</MenuItem>
                  <MenuItem value={29}>Montana</MenuItem>
                  <MenuItem value={30}>North Carolina</MenuItem>
                  <MenuItem value={31}>North Dakota</MenuItem>
                  <MenuItem value={32}>Nebraska</MenuItem>
                  <MenuItem value={33}>New Hampshire</MenuItem>
                  <MenuItem value={34}>New Jersey</MenuItem>
                  <MenuItem value={35}>New Mexico</MenuItem>
                  <MenuItem value={36}>Nevada</MenuItem>
                  <MenuItem value={37}>New York</MenuItem>
                  <MenuItem value={38}>Ohio</MenuItem>
                  <MenuItem value={39}>Oklahoma</MenuItem>
                  <MenuItem value={40}>Oregon</MenuItem>
                  <MenuItem value={41}>Pennsylvania</MenuItem>
                  <MenuItem value={42}>Puerto Rico</MenuItem>
                  <MenuItem value={43}>Rhode Island</MenuItem>
                  <MenuItem value={44}>South Carolina</MenuItem>
                  <MenuItem value={45}>South Dakota</MenuItem>
                  <MenuItem value={46}>Tennessee</MenuItem>
                  <MenuItem value={47}>Texas</MenuItem>
                  <MenuItem value={48}>Utah</MenuItem>
                  <MenuItem value={49}>Virginia</MenuItem>
                  <MenuItem value={50}>Virgin Islands</MenuItem>
                  <MenuItem value={51}>Vermont</MenuItem>
                  <MenuItem value={52}>Washington</MenuItem>
                  <MenuItem value={53}>Wisconsin</MenuItem>
                  <MenuItem value={54}>West Virginia</MenuItem>
                  <MenuItem value={55}>Wyoming</MenuItem>
                </Select>
                <br></br>
                <Button size="small" onClick={handleSubmit} variant="contained">Submit</Button>
              </FormControl>

              <br></br>
              <br></br>

              <div>
                <Doughnut
                  data={state3}
                  options={{
                    title: {
                      display: true,
                      text: 'COVID-19 ' + StateData[0] + ' Statistics',
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
                <canvas
                  id="AccessibleBar"
                  hight="1"
                  aria-label={"Pie chart."}
                  role="img"
                ></canvas>
              </div>
              <div>
                <Doughnut
                  data={state4}
                  options={{
                    title: {
                      display: true,
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
                <canvas
                  id="AccessibleBar"
                  hight="1"
                  aria-label={"Pie chart."}
                  role="img"
                ></canvas>
              </div>

              <Typography>
                Deaths: {StateData[1]}
              </Typography>
              <Typography>
                Recovered: {StateData[2]}
              </Typography>
              <Typography>
                Positive: {StateData[3]}
              </Typography>
              <Typography>
                Negative: {StateData[4]}
              </Typography>
              <Typography>
                Hospitalized: {StateData[5]}
              </Typography>

            </Route>

            <Route path="/USData">
              <div>
                <Pie
                  data={state}
                  options={{
                    title: {
                      display: true,
                      text: 'COVID-19 US Statistics',
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
                <canvas
                  id="AccessibleBar"
                  hight="1"
                  aria-label={"Pie chart."}
                  role="img"
                ></canvas>
              </div>

              <div>
                <Bar
                  data={state2}
                  options={{
                    title: {
                      display: true,
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
                <canvas
                  id="AccessibleBar"
                  hight="1"
                  aria-label={"Pie chart."}
                  role="img"
                ></canvas>
                <header className="USData">
                  <Typography paragraph>
                    Deaths: {USCoronaState[0]}
                  </Typography>
                  <Typography paragraph>
                    Recovered: {USCoronaState[1]}
                  </Typography>
                  <Typography paragraph>
                    Positive: {USCoronaState[2]}
                  </Typography>
                  <Typography paragraph>
                    Negative: {USCoronaState[3]}
                  </Typography>
                  <Typography paragraph>
                    Hospitalized: {USCoronaState[4]}
                  </Typography>

                </header>
              </div>

            </Route>
            <Route path="/">

              <header className="Home">
                <img src={image} className="Image-Virus" alt="Covid-19 represntation of virus" />
                <h3> What We Offer </h3>
                <div>
                  <h4>Features:</h4>
                  <ul>
                    <li> View COVID-19 data within the United States as a whole </li>
                    <li> View COVID-19 data within each U.S. State </li>
                  </ul>
                </div>
                <br></br>
                <h3> Where We Get Our Data </h3>
                <img src={image2} className="Image-Data" alt="Data processing" />
                <br></br>
                <div>
                  <h4> Our Data Is Pulled From The Following Resource: </h4>
                  <ul>
                    <li >
                      <a className="Link" href="https://covidtracking.com/"> COVID-19 Tracking Project </a>
                    </li>
                  </ul>
                </div>
              </header>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
export default App;
