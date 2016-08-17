import React from 'react';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import {GridList, GridTile} from 'material-ui/GridList';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import KeyboardBackspace from 'material-ui/svg-icons/notification/more';

import keyboard from '../keyboard';
import styles from '../styles';

const initialState = {
	userInput: '',
	combinations: []
}

var CustomCounter = function(min, max) {
    this.min = min.slice(0)
    this.max = max.slice(0)
    this.curr = this.min.slice(0)
    this.length = this.min.length
}

CustomCounter.prototype.increment = function() {
    for (var i = this.length - 1, ii = 0; i >= ii; i--) {
        this.curr[i] += 1
        if (this.curr[i] > this.max[i]) {
            this.curr[i] = 0
        } else {
            break
        }
    }
}

CustomCounter.prototype.is_max = function() {
    for (var i = 0, ii = this.length; i < ii; ++i) {
        if (this.curr[i] !== this.max[i]) {
            return false
        }
    }
    return true
}

var PhoneNumber = function(phone_number) {
    this.phone_number = phone_number
    this.combinations = []
}

PhoneNumber.number_to_combinations = keyboard;

PhoneNumber.prototype.get_combination_by_digit = function(digit) {
    return PhoneNumber.number_to_combinations[digit]
}

PhoneNumber.prototype.add_combination_by_indexes = function(indexes) {
    var combination = ''
    for (var i = 0, ii = indexes.length; i < ii; ++i) {
        var phone_number_digit = this.phone_number[i]
        combination += this.get_combination_by_digit(phone_number_digit)[indexes[i]]
    }

    this.combinations.push(combination)
}

PhoneNumber.prototype.update_combinations = function() {
    var min_indexes = []
      , max_indexes = []

    for (var i = 0, ii = this.phone_number.length; i < ii; ++i) {
        var digit = this.phone_number[i]
        min_indexes.push(0)
        max_indexes.push(this.get_combination_by_digit(digit).length - 1)
    }

    var c = new CustomCounter(min_indexes, max_indexes)

    while(true) {
        this.add_combination_by_indexes(c.curr)
        c.increment()

        if (c.is_max()) {
            this.add_combination_by_indexes(c.curr)
            break
        }
    }
}

function t9(userInput) {
	var phone_number = new PhoneNumber(userInput)
	phone_number.update_combinations()
	return phone_number.combinations
}

export default class View extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
  	console.log(initialState);
  	this.setState(initialState);
  	console.log(this);
  	debugger;
  }

  addNumber(newInput) {
  	let userInput = this.state.userInput + newInput;
  	this.assignCombinationsToState(userInput);
  	this.setState({
  		userInput  
  	});
  }

  removeNumber() {
  	let userInput = this.state.userInput.slice(0, -1);
  	this.assignCombinationsToState(userInput);
  	this.setState({
  		userInput
  	});
  }

  assignCombinationsToState(userInput) {
  	let combinations = t9(userInput);
  	this.setState({
  		combinations
  	});
  	console.log(combinations);
  }


  render() {

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
			    <Paper>
			   
 			    </Paper>
			  </div>
		  </div>
		);
	}
}

