import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header';
import useTitle from './hooks/useTitle';
import GlobalContext from './context/global';
import Main from './components/main';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';
import FormPart1 from './components/formPart1';
import FormPart2 from './components/formPart2';
import AddEvent from './components/AddEvent';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
      light: red[400],
      dark: red[700]
    },
  },
});

function App() {
  const [globalStore, setGlobalStore] = React.useState({
    appName: "Meeting Room Booking",
    isLoggedIn: false,
    meetingRoom: '',
    name: '',
    description: '',
    date: '',
    timeSlot: '',
  })
  useTitle("Meeting Room Booking");
  return (
    <>
      <Router>
        <ThemeProvider theme={myTheme}>
          <GlobalContext.Provider value={{ globalStore, setGlobalStore }}>
            <CssBaseline />

            <Header />
            <Main >
              <Switch>
                <Route path="/addevent" >
                  <AddEvent />
                </Route>
                <Route path="/part2" >
                  <FormPart2 />
                </Route>
                <Route path="/" >
                  <FormPart1 />
                </Route>
              </Switch>
            </Main>
          </GlobalContext.Provider>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
