import { shallow } from 'enzyme';  // eslint-disable-line
import { shallowToJson } from 'enzyme-to-json';  // eslint-disable-line
import React from 'react';
import Score from '../Score';

const props = {
  rolls: [],
};

describe('<Score />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <Score {...props} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
