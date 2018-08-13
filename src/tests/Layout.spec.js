import React from 'react';
import { shallow } from 'enzyme';

import {Header, Error404} from '../components/Layout';

describe('<Header />', () => {
  it('renders two <ul>', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('ul').length).toEqual(2);
  });

 it('renders four <li>', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('li').length).toEqual(3);
  });
});

describe('<Error404 />', () => {
    let wrapper;
    beforeAll(() => {
     wrapper = shallow(<Error404 />);
    })
  it('renders one <h1>', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

 it('renders one <p>', () => {
    expect(wrapper.find('p').length).toEqual(1);
  });
});