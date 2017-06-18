import { shallow, mount } from 'enzyme';  // eslint-disable-line
import { shallowToJson } from 'enzyme-to-json';  // eslint-disable-line
import React from 'react';
import ScoreForm from '../ScoreForm';

const props = {
  round: {
    rolls: [],
  },
};

let mountedComponent;

describe('<ScoreForm />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ScoreForm {...props} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('methods', () => {
    beforeEach(() => {
      mountedComponent = mount(<ScoreForm {...props} />);
    });

    describe('getNumber', () => {
      it('return 0', () => {
        expect(mountedComponent.instance().getNumber()).toBe(0);
      });
      it('return 0', () => {
        expect(mountedComponent.instance().getNumber('a')).toBe(0);
      });
      it('return 10', () => {
        expect(mountedComponent.instance().getNumber(10)).toBe(10);
      });
    });

    describe('setScore', () => {
      it('set score', () => {
        mountedComponent.instance().setScore('first', 5);
        expect(mountedComponent.state().scores.first).toBe(5);
      });
      it('score not set score if over 10', () => {
        mountedComponent.instance().setScore('first', 5);
        expect(mountedComponent.state().scores.first).toBe(5);
        mountedComponent.instance().setScore('first', 11);
        expect(mountedComponent.state().scores.first).toBe(5);
      });
      it('set first and second score', () => {
        mountedComponent.instance().setScore('first', 5);
        mountedComponent.instance().setScore('second', 5);
        expect(mountedComponent.state().scores.first).toBe(5);
        expect(mountedComponent.state().scores.second).toBe(5);
      });
      it('not set second score if total score is over 10', () => {
        mountedComponent.instance().setScore('first', 5);
        mountedComponent.instance().setScore('second', 6);
        expect(mountedComponent.state().scores.first).toBe(5);
        expect(mountedComponent.state().scores.second).toBe(undefined);
      });
    });
  });
});
