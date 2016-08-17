import React from 'react';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import KeyboardBackspace from 'material-ui/svg-icons/notification/more';

import keyboard from '../keyboard';

const initialState = {
	userInput: ''
}

export default class View extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
  	this.setState(initialState); 
  }

  addNumber(newInput) {
  	this.setState({
  		userInput: this.state.userInput + newInput 
  	});
  	t9(this.state.userInput);
  }

  removeNumber() {
  	this.setState({
  		userInput: this.state.userInput.slice(0, -1)
  	});
  }


  render() {

		const styles = {
		  root: {
		    display: 'flex',
		    flexWrap: 'wrap',
		    justifyContent: 'space-around',
		  },
		  gridList: {
		    width: 700,
		    overflowY: 'auto',
		    marginBottom: 24,
		  },
		};

		

		return(
		  <div style={{width: '700px'}}>
			  <Paper style={{height: '70px', fontSize: '60px', verticalAlign: 'middle', marginBottom: '24px'}}>
			  	{this.state.userInput}
			  	<KeyboardBackspace 
			  		color={red500} 
			  		hoverColor={greenA200} 
			  		style={{'float': 'right', verticalAlign: 'middle', width: '60px', height: '60px', paddingRight: '5px'}}
			  		onTouchTap={this.removeNumber.bind(this)}/>
			  </Paper>
			  <div style={styles.root}>
			    <GridList
			      cellHeight={70}
			      style={styles.gridList}
			      cols={3}
			    >
			      {Object.keys(keyboard).map(num => (
			        <GridTile
			          title={num}
			          subtitle={keyboard[num]}
			          onTouchTap={this.addNumber.bind(this, num)}
			        />
			      ))}
			    </GridList>
			  </div>
		  </div>
		);
	}
}

