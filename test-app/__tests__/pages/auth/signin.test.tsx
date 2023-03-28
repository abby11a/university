import Signin, { getServerSideProps } from '@/pages/auth/signin';
import { fireEvent, render, screen } from '@testing-library/react';
import { getProviders, getSession, signIn } from 'next-auth/react';

jest.mock('next/router', () => ({
    push: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
    getSession: jest.fn(),
    getProviders: jest.fn(),
}));

describe('Signin component', () => {
    it('should call signIn with the correct arguments when the correct form is submitted', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve());
        render(<Signin />);

        const emailInput = screen.getByLabelText('Email address');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Log in' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        expect(signIn).toHaveBeenCalledWith('credentials', {
            email: 'test@example.com',
            password: 'password'
        });
    });

    describe('getServerSideProps', () => {
        const mockSession = { user: { name: 'user' } };
        const mockProviders = { email: {} };
        const mockReq = { headers: {} };
        const mockContext = { req: mockReq };

        beforeEach(() => {
            getSession.mockClear();
            getProviders.mockClear();
        });

        it('should redirect to home page if the user is already authenticated', async () => {
            getSession.mockResolvedValue(mockSession);

            const result = await getServerSideProps(mockContext);
            
            expect(result).toEqual({
                redirect: {
                    destination: '/'
                },
            });
        });

        it('should return available authentication providers if user is not authenticated', async () => {
            getSession.mockResolvedValue(null);
            getProviders.mockResolvedValue(mockProviders);

            const result = await getServerSideProps(mockContext);

            expect(result).toEqual({
                props: {
                    providers: mockProviders
                },
            });
        });
    });
});
