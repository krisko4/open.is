import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Banner } from './Banner';
import { BrowserRouter } from 'react-router-dom';
import Content from './Content';
import { AuthContextProvider } from 'contexts/AuthContext';
import { LoginContextProvider } from 'contexts/LoginContext';

describe('Banner', () => {
  test('Renders heading and button if scroll is less than 150px', () => {
    render(
      <BrowserRouter>
        <Banner />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test('Does not render heading and button if scroll is more than 150px', () => {
    render(
      <BrowserRouter>
        <LoginContextProvider>
          <AuthContextProvider>
            <Banner />
            <Content />
          </AuthContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    );
    fireEvent.scroll(document, { target: { scrollY: 200 } });
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
