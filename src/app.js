import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var theme = getMuiTheme();

import View from './components/View';

ReactDOM.render(
	<div>
    <MuiThemeProvider muiTheme={theme}>
      <div>
				<View/>
		  </div>
    </MuiThemeProvider>
  </div>,
	document.getElementById('app')
);

