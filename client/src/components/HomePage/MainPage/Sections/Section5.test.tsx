import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Section5 from './Section5';
describe('Section5', () => {
  test('Renders all given opinions', () => {
    render(<Section5 />);
    expect(screen.getAllByTestId('opinions')).toHaveLength(3);
  });
});
