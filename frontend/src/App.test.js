import { render, act } from '@testing-library/react';
import App from './App';
import Api from './api';
import { AuthContext } from './context/authContext';

jest.mock('./api');

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('checks token on mount', async () => {
    const token = 'test-token';
    sessionStorage.setItem('token', token);
    Api.verifyToken.mockResolvedValue({ message: 'Token verified' });

    await act(async () => {
      render(
        <AuthContext.Provider value={{ currentUser: token }}>
          <App />
        </AuthContext.Provider>
      );
    });

    expect(Api.verifyToken).toHaveBeenCalledWith(token);
  });

  it('does not check token if not in session storage', async () => {
    sessionStorage.clear();
    Api.verifyToken.mockClear();

    await act(async () => {
      render(<App />);
    });

    expect(Api.verifyToken).not.toHaveBeenCalled();
  });
});