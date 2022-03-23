import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section6 from './Section2';

describe('Section6', () => {
  test('Renders content if isVisible is true', () => {
    render(<Section6 isVisible={true} />);
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('dark-panel')).toBeInTheDocument();
  });

  test('Does not render content if isVisible is false', () => {
    render(<Section6 isVisible={false} />);
    expect(screen.queryByTestId('content')).not.toBeVisible();
    expect(screen.queryByTestId('dark-panel')).not.toBeVisible();
  });

  test('Renders light panel if isVisible7 is true', () => {
    render(<Section6 isVisible={true} />);
    expect(screen.getByTestId('light-panel')).toBeInTheDocument();
  });

  test('Does not render light panel if isVisible7 is false', () => {
    render(<Section6 isVisible={false} />);
    expect(screen.queryByTestId('light-panel')).not.toBeVisible();
  });
});
