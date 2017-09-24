import React from 'react';
import {expect} from 'chai';
import chai from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Form, FormControl, Button } from 'react-bootstrap';

import Clock from './clock/Clock';
import App from './App';

chai.should();
chai.use(sinonChai);

function setup(){
  return shallow(<App />);
}

describe('App', () => {

  it('should render Clock component', () => {
    // arrange
    const wrapper = setup();

    // assert
    expect(wrapper.find(Clock).length).to.equal(1);
  });

  it('should call setDeadline method', () => {
    // arrange
    const spy = sinon.spy(App.prototype, "setDeadline");
    const wrapper = setup();
    const submitButton = wrapper.find(Button).first();

    // act
    submitButton.simulate('click');

    // assert
    spy.should.have.been.called;
    App.prototype.setDeadline.restore();
  });

  it('should call changeDeadline method', () => {
    // arrange
    const spy = sinon.spy(App.prototype, "changeDeadline");
    const wrapper = setup();
    const deadlineInput = wrapper.find(FormControl).first();

    // act
    deadlineInput.simulate('change', { target: {
      value: 'September 31, 2017'
    }});

    // assert
    spy.should.have.been.called;
    App.prototype.changeDeadline.restore();
  });

  it('should change deadline', () => {
        // arrange
        const wrapper = setup();
        const deadlineInput = wrapper.find(FormControl).first();
        const submitButton = wrapper.find(Button).first();

        // act
        deadlineInput.simulate('change', { target: {
          value: 'September 31, 2017'
        }});
        submitButton.simulate('click');

        // assert
        const state = wrapper.state();
        expect(state.deadline).to.equal('September 31, 2017');
  })

  it('should change newDeadline', () => {
    // arrange
    const wrapper = setup();
    const deadlineInput = wrapper.find(FormControl).first();

    // act
    deadlineInput.simulate('change', { target: {
      value: 'September 31, 2017'
    }});

    // assert
    const state = wrapper.state();
    expect(state.newDeadline).to.equal('September 31, 2017');

  });
});
