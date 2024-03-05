// Test file: SignUp.test.tsx

import SignUp from '@/pages/auth/signup';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Router from 'next/router'

jest.mock('next/router', () => ({
    push: jest.fn(),
}))

// Tests /auth/signup file
describe('SignUp', () => {
    it('should submit the form with correct data', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve());

        render(<SignUp />);

        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email address');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(nameInput, { target: { value: 'User' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.submit(screen.getByRole('button', { name: "Sign up" }));
        await waitFor(() => expect(fetch).toHaveBeenCalled());

        expect(fetch).toHaveBeenCalledWith('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
    })

    it('should return if canceled', async () => {
        render(<SignUp />)
        fireEvent.click(screen.getByText("or Cancel"));
        expect(Router.push).toHaveBeenCalledWith("/");
    })

    it('should handle errors', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject('API Error'));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        render(<SignUp />);

        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email address');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: "Sign up"});

        fireEvent.change(nameInput, { target: { value: 'User' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.submit(submitButton);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(consoleErrorSpy).toHaveBeenCalledWith('API Error');
    });
});