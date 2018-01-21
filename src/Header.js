import _ from 'lodash';
import React from 'react';
import { withStyles } from "material-ui/styles";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AccountCircle from "material-ui-icons/AccountCircle";

export const Header = withStyles({
  flex: {
    flex: 1
  }
})(
  class extends React.Component {
    render() {
      return (
        <AppBar>
          <Toolbar>
            <Typography
              type="title"
              color="inherit"
              className={this.props.classes.flex}
            >
              {_.capitalize(this.props.title)}
            </Typography>
            <IconButton color="contrast">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      );
    }
  }
  );
