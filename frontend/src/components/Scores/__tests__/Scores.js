import { shallow } from 'enzyme';  // eslint-disable-line
import { shallowToJson } from 'enzyme-to-json';  // eslint-disable-line
import React from 'react';
import Scores from '../Scores';

const props = {};

describe('<Scores />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <Scores {...props} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
