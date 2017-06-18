import { shallow } from 'enzyme';  // eslint-disable-line
import { shallowToJson } from 'enzyme-to-json';  // eslint-disable-line
import React from 'react';
import ScoreInput from '../ScoreInput';

const props = {};

describe('<ScoreInput />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ScoreInput {...props} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
