import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Auth } from 'components/auth';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { TestMockWrapper } from 'test-utils/TestMockWrapper';

describe('Auth', () => {
  const server = setupServer(
    rest.post(`${import.meta.env.VITE_BASE_URL}/login`, (req, res, ctx) => {
      console.log('logged in!');
      return res(
        ctx.json({
          uid: 'test_uid',
          email: 'test_email',
          img: 'test_img',
        }),
      );
    }),
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  test('Should render login form if logOpen is true', () => {
    render(
      <TestMockWrapper isLoggedIn={false} logOpen={true}>
        <Auth />
      </TestMockWrapper>,
    );
    const signupLink = screen.getByTestId('signup-link');
    expect(signupLink).toBeInTheDocument();
  });
  test('Should render registration form if regOpen is true', () => {
    render(
      <TestMockWrapper isLoggedIn={false} regOpen={true}>
        <Auth />
      </TestMockWrapper>,
    );
    const signinLink = screen.getByTestId('signin-link');
    expect(signinLink).toBeInTheDocument();
  });

  test('Should switch to registration form on signup link click', () => {
    render(
      <TestMockWrapper isLoggedIn={false} logOpen={true}>
        <Auth />
      </TestMockWrapper>,
    );
    const signupLink = screen.getByTestId('signup-link');
    fireEvent.click(signupLink);
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    expect(screen.getByTestId('registration-form')).toBeInTheDocument();
  });

  test('Should switch to login form on signin link click', () => {
    render(
      <TestMockWrapper isLoggedIn={false} regOpen={true}>
        <Auth />
      </TestMockWrapper>,
    );
    const signinLink = screen.getByTestId('signin-link');
    fireEvent.click(signinLink);
    expect(screen.queryByTestId('registration-form')).not.toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
  test('Should close auth drawer after successful login', async () => {
    render(
      <TestMockWrapper isLoggedIn={false} logOpen={true}>
        <Auth />
      </TestMockWrapper>,
    );
    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText(/Sign in/);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test1234@' } });
    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.queryByTestId('auth-drawer')).not.toBeInTheDocument();
    });
  });
});
