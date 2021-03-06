import { configure } from '@storybook/react';
import * as React from 'react';

const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}
configure(loadStories, module);