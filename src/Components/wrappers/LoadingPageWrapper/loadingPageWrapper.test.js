import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingPageWrapper from './';

describe('<LoadingPageWrapper/>', function() {
   it('renders the children when not loading', () => {
      const { getByText } = render(<LoadingPageWrapper showLoading={false}>Render this text</LoadingPageWrapper>);
      expect(getByText(/Render this text/i)).toBeInTheDocument();
   });
});
