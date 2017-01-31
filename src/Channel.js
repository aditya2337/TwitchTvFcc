import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class Channel extends Component {

  constructor(props) {
    super(props);
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    var {channelName, avatar, label, url, expanded} = this.props;
    console.log(this.props.expanded);return (
      <a href = {url} target = "_blank">
      <Card style={{margin: '2em'}}>
        <CardHeader
          title={channelName}
          avatar={avatar}
          actAsExpander={true}
        />
      <CardText className = "name">
          <Toggle
            toggled={expanded}
            labelPosition="left"
            label={label}
          />
        </CardText>
      </Card>
      </a>
    );
  }
}

Channel.childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired,
};

export default Channel;
