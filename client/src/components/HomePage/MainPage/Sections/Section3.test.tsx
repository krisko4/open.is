import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section3 from './Section3';

describe('Section3', () => {
  test('Renders content if isVisible is true', () => {
    render(<Section3 isVisible={true} isVisible1={false} />);
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
  });

  test('Does not render content if isVisible is false', () => {
    render(<Section3 isVisible={false} isVisible1={false} />);
    expect(screen.queryByTestId('content')).not.toBeVisible();
    expect(screen.queryByTestId('image')).not.toBeVisible();
  });
});
