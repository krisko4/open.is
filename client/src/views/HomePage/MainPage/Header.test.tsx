import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TestMockWrapper } from 'test-utils/TestMockWrapper';
import Header from './Header';
import { Auth } from 'components/Auth';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('Header', () => {
  const server = setupServer(
    rest.get(`${process.env.REACT_APP_BASE_URL}/logout`, (req, res, ctx) => {
      console.log('logged out!');
      return res(ctx.status(200));
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  test('Displays panel navigate button and sign out button if user is signed in', () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <Header />
      </TestMockWrapper>
    );
    expect(screen.getByTestId('signout-button')).toBeInTheDocument();
    expect(screen.getByTestId('panel-navigate-button')).toBeInTheDocument();
    expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();
  });
  test('Displays sign in button if user is signed out', () => {
    render(
      <TestMockWrapper isLoggedIn={false}>
        <Header />
      </TestMockWrapper>
    );
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.queryByTestId('signout-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('panel-navigate-button')).not.toBeInTheDocument();
  });

  test('Replaces panel navigate button and sign out button with sign in button on click', async () => {
    render(
      <TestMockWrapper isLoggedIn={true}>
        <Header />
      </TestMockWrapper>
    );
    const signoutButton = screen.getByTestId('signout-button');
    expect(signoutButton).toBeInTheDocument();
    expect(screen.getByTestId('panel-navigate-button')).toBeInTheDocument();
    expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();
    fireEvent.click(signoutButton);
    await waitFor(() => {
      expect(screen.queryByTestId('signout-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('panel-navigate-button')).not.toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });
  });

  test('Displays auth drawer on sign in button click', () => {
    render(
      <TestMockWrapper isLoggedIn={false}>
        <Auth />
        <Header />
      </TestMockWrapper>
    );
    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeInTheDocument();
    expect(screen.queryByTestId('auth-drawer')).not.toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(screen.getByTestId('auth-drawer')).toBeInTheDocument();
  });
});
