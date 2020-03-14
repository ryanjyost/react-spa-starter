import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('react-spa-starter', () => {
   it('works', () => {
      const { container } = render(<App />);
      expect(container).toBeTruthy();
   });
});
