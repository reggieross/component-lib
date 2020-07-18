import { mount } from 'enzyme';
import { StandardPage } from './StandardPage';
import React from 'react';

describe('Standard Page', () => {
  it('Should mount component successfully', () => {
    const component = mount(
      <StandardPage pageId={'some-page'}>
        <div />
      </StandardPage>
    );

    expect(component.exists()).toBe(true);
  });
});
