import { Contact } from './Contact';
import { render, screen } from '@testing-library/react';
import { TestMockWrapper } from 'test-utils/TestMockWrapper';

describe('Contact', () => {
  test('Should render all given icons', () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <Contact />
      </TestMockWrapper>
    );
    expect(screen.getAllByTestId('icon')).toHaveLength(5);
  });
});
