import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

const navigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => navigateMock,
}));

test('Header renders with user name and sign out button', () => {
    render(<Header />);
    expect(screen.getByTestId('signout')).toBeTruthy();
});

test('Clicking "Sign Out" button calls signOut function and clears localStorage', () => {
    render(<Header />);
    const signOutButton = screen.getByTestId('signout');
    fireEvent.click(signOutButton);
    expect(navigateMock).toHaveBeenCalledWith('/', { replace: true });
});
