import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section4 from './Section4';

describe('Section4', () => {
  test('Renders content if isVisible is true', () => {
    render(<Section4 isVisible={true} />);
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  test('Does not render content if isVisible is false', () => {
    render(<Section4 isVisible={false} />);
    expect(screen.queryByTestId('content')).not.toBeVisible();
  });
});
