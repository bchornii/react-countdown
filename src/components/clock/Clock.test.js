import React from 'react';
import {expect} from 'chai';
import chai from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Clock from './Clock';

chai.should();
chai.use(sinonChai);

function setup(){
  const props = {
    deadline: 'January 1, 2018'
  };
  return mount(<Clock {...props} />);
}
let clock;

describe('Clock', () => {

  beforeEach(() => {
    const now = new Date(2017, 8, 24).getTime();
    clock = sinon.useFakeTimers(now);
  });

  afterEach(() => {
    clock.restore();
  });

  it('should call componentDidMount', () => {
    // arrange
    var spy = sinon.spy(Clock.prototype, "componentDidMount");
    const wrapper = setup();

    // act

    // assert
    spy.should.have.been.called;
    Clock.prototype.componentDidMount.restore();
  });

  it('should call tick method', () => {
    // arrange
    const spy = sinon.spy(Clock.prototype, "tick");
    const wrapper = setup();

    // act
    clock.tick(1000);

    // assert
    spy.should.have.been.called;
    Clock.prototype.tick.restore();
  });

  it('should update time to deadline', () => {
    // arrange
    const wraper = setup();

    // act
    clock.tick(1000);

    // assert
    const state = wraper.state();
    expect(state.days).to.equal(99);
  });

});
