import { shallow } from 'enzyme';  // eslint-disable-line
import { shallowToJson } from 'enzyme-to-json';  // eslint-disable-line
import React from 'react';
import Bowling from '../';

const props = {
  actions: {
    addScore: () => {},
  },
  bowling: {
    status: 'active',
    scores: [],
  },
};

describe('<Bowling />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <Bowling {...props} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
