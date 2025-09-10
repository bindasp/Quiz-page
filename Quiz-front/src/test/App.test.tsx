import '@testing-library/jest-dom'; // matcher toBeInTheDocument
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Header } from '../components/Header';

jest.mock('../hooks/useIsLogged');
jest.mock('../hooks/useIsAdmin');

const { useIsLogged } = require('../hooks/useIsLogged');
const { useIsAdmin } = require('../hooks/useIsAdmin');

const theme = {};

describe('Header component', () => {
  test('renders login and register buttons when user is NOT logged in', () => {
    useIsLogged.mockReturnValue(false);
    useIsAdmin.mockReturnValue(false);

    render(
      <MantineProvider theme={theme}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.getByText(/Zaloguj się/i)).toBeInTheDocument();
    expect(screen.getByText(/Zarejestruj się/i)).toBeInTheDocument();
  });

  test('renders account menu when user IS logged in', () => {
    useIsLogged.mockReturnValue(true);
    useIsAdmin.mockReturnValue(false);

    render(
      <MantineProvider theme={theme}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MantineProvider>,
    );

    expect(screen.getByText(/Konto/i)).toBeInTheDocument();

    expect(screen.getByText(/Dodaj quiz/i)).toBeInTheDocument();
  });
});
