import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { devicesMock, emptyDeviceMock } from '../../__mocks__/devicesMock';
import Form from '@/components/Form';

const newDevice = {
    id: "newID",
    make: "newMake",
    model: "newModel",
    chipset: "newChipset",
    status: "newStatus",
    location: "newLocation",
    availability: true,
}

describe('Form', () => {
    it('calls onSubmit with the form data when submitted', () => {
        const mockOnSubmit = jest.fn();
        render(<Form deviceValues={devicesMock[0]} onSubmit={mockOnSubmit} idUnvailable={false} />);

        const idInput = screen.getByLabelText('ID');
        const makeInput = screen.getByLabelText('Make');
        const modelInput = screen.getByLabelText('Model');
        const statusInput = screen.getByLabelText('Status');
        const chipsetInput = screen.getByLabelText('Chipset');
        const locationInput = screen.getByLabelText('Location');
        const submitButton = screen.getByRole('button', { name: 'Create' });

        fireEvent.change(idInput, { target: { value: newDevice.id } });
        fireEvent.change(makeInput, { target: { value: newDevice.make } });
        fireEvent.change(modelInput, { target: { value: newDevice.model } });
        fireEvent.change(statusInput, { target: { value: newDevice.status} });
        fireEvent.change(chipsetInput, { target: { value: newDevice.chipset } });
        fireEvent.change(locationInput, { target: { value: newDevice.location } });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            id: newDevice.id,
            make: newDevice.make,
            model: newDevice.model,
            status: newDevice.status,
            chipset: newDevice.chipset,
            location: newDevice.location,
            availability: newDevice.availability
        });
    });

    test('the form cannot be submitted without the required fields', () => {
        const mockOnSubmit = jest.fn();
        render(<Form deviceValues={emptyDeviceMock[0]} onSubmit={mockOnSubmit} idUnvailable={false} />);

        const submitButton = screen.getByRole('button', { name: "Create" });
        fireEvent.click(submitButton);
        expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });
});

