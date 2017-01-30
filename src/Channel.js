import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import $ from 'jquery';

class Channel extends Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
    expanded: false,
    channelName: "loading",
    avatar: "loading",
    label: 'offline'
    };
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    $.getJSON(`https://wind-bow.gomix.me/twitch-api/channels/${this.props.channel}`, (channel) => {
        var channelName = channel.display_name;
        var avatar = channel.logo;
        var label = channel.status;
        if (typeof channel.status === 'string') {
          this.setState({
          avatar, label, expanded: true});
        }
        this.setState({channelName});

    });
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {

    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={{
      margin: '2em'
    }}>
        <CardHeader
          title={this.state.channelName}
          avatar={this.state.avatar}
          actAsExpander={true}
        />
      <CardText className = "name">
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="left"
            label={this.state.label}
          />
        </CardText>
      </Card>
    );
  }
}

Channel.childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired,
};

export default Channel;
