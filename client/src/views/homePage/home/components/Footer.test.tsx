import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('Renders footer content', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(
      screen.getByText('This is a simple project created in educational purposes, designed with Material UI.')
    ).toBeInTheDocument();
  });

  test('Renders Facebook Icon', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByTitle('facebook-icon')).toBeInTheDocument();
  });
});
