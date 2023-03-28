import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import Create from '../../src/pages/create';

jest.mock('next/router', () => ({
    useRouter() {
        return ({
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn()
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null)
        });
    },
}));


test('renders the Create page', () => {
    render(<Create />)
    expect(screen.getByText('Create Device')).toBeInTheDocument()
})