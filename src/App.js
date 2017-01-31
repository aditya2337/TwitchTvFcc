import React, { Component } from 'react';
import Channel from './Channel';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
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

  constructor(props) {
    super(props);
    this.state = {
    channels: []
    };
  }

  filterChannel(channels) {
    channels = channels.filter( (channel) => {
      return typeof channel !== "string";
    })
  }

  componentWillMount() {
    this.setState({channels: this.getData()});
  }

  getData() {
    const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
    const data = users.reduce( (acc, value) => {
      let APIcall = $.ajax({
        url: `https://wind-bow.gomix.me/twitch-api/channels/${value}`,
        dataType: 'json',
        async: false,
        success: function(channel) {
          var channelName = channel.display_name;
          var avatar = channel.logo;
          var label = channel.status;
          var url = channel.url;
          var expanded = false;
          if (typeof channel.status === "string") {
            expanded = true;
          }
          acc.push({channelName, avatar, label, url, expanded});
        }
      });
      return acc;
    }, [])
    return data;
  }


  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    // var keys = Object.keys(this.state.channel["ESL_SC2"]);
    var channelList = this.getData();
    var onlineList = channelList.filter( (val) => {
      return typeof val.label === "string";
    })
    var offlineList = channelList.filter( (val) => {
      return typeof val.label !== "string";
    })
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>

          <Tabs>
            <Tab label="All" >
              <div>
                {channelList.map(channel => <Channel
                  channelName = {channel.channelName}
                  avatar = {channel.avatar}
                  label = {channel.label}
                  url = {channel.url}
                  expanded = {channel.expanded}/>)}
              </div>
            </Tab>
            <Tab label="Online" >
              <div>
                {onlineList.map(channel => <Channel
                  channelName = {channel.channelName}
                  avatar = {channel.avatar}
                  label = {channel.label}
                  url = {channel.url}
                  expanded = {channel.expanded}/>)}
              </div>
            </Tab>
          <Tab label="Offline">
            <div>
              {offlineList.map(channel => <Channel
                channelName = {channel.channelName}
                avatar = {channel.avatar}
                label = {channel.label}
                url = {channel.url}
                expanded = {channel.expanded}/>)}
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
