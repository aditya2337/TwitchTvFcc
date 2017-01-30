import React, { Component } from 'react';
import Channel from './Channel';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// const styles = {
//   headline: {
//     fontSize: 24,
//     paddingTop: 16,
//     marginBottom: 12,
//     fontWeight: 400,
//   },
// };
class App extends Component {
  render() {
    const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>

          <Tabs>
            <Tab label="All" >
              <div>
                  {users.map(user => <Channel channel={user} />)}
              </div>
            </Tab>
            <Tab label="Online" >
              <div>
                  {users.map(user => <Channel channel={user} />)}
              </div>
            </Tab>
          <Tab label="Offline">
        <div>
          {users.map(user => <Channel channel={user} />)}
        </div>
      </Tab>
    </Tabs>
        </div>
      </MuiThemeProvider >
    );
  }
}

App.childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired,
};

export default App;
