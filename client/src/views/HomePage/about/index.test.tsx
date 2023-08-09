import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { About } from '.';

describe('About', () => {
  test('Renders team in 2nd section', () => {
    render(<About initialIndex={1} />);
    expect(screen.getByTestId('team')).toBeInTheDocument();
  });
  test('Does not render team in 1st section', () => {
    render(<About initialIndex={0} />);
    expect(screen.queryByTestId('team')).not.toBeInTheDocument();
  });
  test('Does not render team in 3rd section', () => {
    render(<About initialIndex={2} />);
    expect(screen.queryByTestId('team')).not.toBeInTheDocument();
  });
});
