import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Router from 'next/router';
import Device from '@/components/Device';
import { devicesMock } from '__mocks__/devicesMock';

jest.mock('next/router', () => ({
    push: jest.fn(),
}));

const device = devicesMock[0];

describe('Device', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a device row', () => {
        const { getByText } = render(<Device device={device} />);
        expect(getByText(device.id)).toBeInTheDocument();
        expect(getByText(device.make)).toBeInTheDocument();
        expect(getByText(device.model)).toBeInTheDocument();
        expect(getByText(device.chipset)).toBeInTheDocument();
        expect(getByText(device.status)).toBeInTheDocument();
        expect(getByText(String(device.availability))).toBeInTheDocument();
        expect(getByText(device.location)).toBeInTheDocument();
    });

    it('should navigate to the device page when clicked', () => {
        const { getByRole } = render(<Device device={device} />);
        const row = getByRole('row');
        fireEvent.click(row);
        expect(Router.push).toHaveBeenCalledWith('/single-device/[id]', `/single-device/${device.id}`);
    });
});
