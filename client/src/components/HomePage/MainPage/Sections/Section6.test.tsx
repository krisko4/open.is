import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PanelSection } from './PanelSection';

describe('PanelSection', () => {
  // test('Renders content if isVisible1 is true', () => {
  //   render(<PanelSection isVisible1={true} isVisible2={true} />);
  //   expect(screen.getByTestId('content')).toBeInTheDocument();
  //   expect(screen.getByTestId('dark-panel')).toBeInTheDocument();
  // });

  // test('Does not render content if isVisible1 is false', () => {
  //   render(<PanelSection isVisible1={false} isVisible2={false} />);
  //   expect(screen.queryByTestId('content')).not.toBeVisible();
  //   expect(screen.queryByTestId('dark-panel')).not.toBeVisible();
  // });

  test('Renders light panel if isVisible2 is true', () => {
    render(<PanelSection isVisible1={true} isVisible2={true} />);
    expect(screen.getByTestId('light-panel')).toBeInTheDocument();
    expect(screen.getByTestId('dark-panel')).toBeInTheDocument();
  });

  test('Does not render light panel if isVisible2 is false', () => {
    render(<PanelSection isVisible1={true} isVisible2={false} />);
    expect(screen.getByTestId('dark-panel')).toBeInTheDocument();
    expect(screen.queryByTestId('light-panel')).not.toBeVisible();
  });
});
