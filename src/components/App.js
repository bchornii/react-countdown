import React, { Component } from 'react';
import Clock from './clock/Clock';
import { Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.setDeadline = this.setDeadline.bind(this);
    this.changeDeadline = this.changeDeadline.bind(this);
    this.state = {
      deadline: 'December 25, 2017',
      newDeadline: ''
    };
  }

  changeDeadline(e){
    this.setState({
      newDeadline: e.target.value
    });
  }

  setDeadline(){
    this.setState({
      deadline: this.state.newDeadline
    });
  }

  render(){
    return(
      <div className="App">
        <div className="App-title">
          Coundworn to {this.state.deadline}
        </div>
        <Clock deadline={this.state.deadline} />
        <Form inline>
          <FormControl
            className="Deadline-input"
            placeholder="name"
            onChange={this.changeDeadline}
          />
          <Button onClick={this.setDeadline}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default App;
