import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section1 from './Section1';

describe('Section1', () => {
  test('Renders content if isVisible is true', () => {
    render(<Section1 isVisible={true} />);
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
  });

  test('Does not render content if isVisible is false', () => {
    render(<Section1 isVisible={false} />);
    expect(screen.queryByTestId('title')).not.toBeVisible();
    expect(screen.queryByTestId('content')).not.toBeVisible();
    expect(screen.queryByTestId('image')).not.toBeVisible();
  });
});
