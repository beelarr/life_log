import 'react-native';
import React from 'react';
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Post } from '../app/iOS/Post';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Testing Loading Status of Post component', () => {
    it('renders as expected', () => {
      const wrapper = shallow(
        <Post loading={false} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

});
