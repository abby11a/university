import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Create from '../../src/pages/create';
import Router from "next/router";
import { devicesMock } from '../../__mocks__/devicesMock';
import { SessionProvider } from 'next-auth/react';

jest.mock("next/router", () => ({
	push: jest.fn(),
}));

describe('Create component', () => {
    const device = devicesMock[0];
    const session = { user: { name: "John Doe", email: "john.doe@example.com", role: 'Admin'}, expires: "12345" };
    test('renders the Create page', () => {
        render(<SessionProvider session={session}><Create/></SessionProvider>)
        expect(screen.getByRole("heading", {name: "Create Device"})).toBeInTheDocument()
    })

    // Creating a device functionality tested in __tests__/components/form.test.tsx

    it('should have empty values so the user can create a new device', async () => {
        render(<SessionProvider session={session}><Create/></SessionProvider>);

        const idInput = screen.getByRole('textbox', { name: "ID" });
        const makeInput = screen.getByRole('textbox', { name: "Make" });
        const modelInput = screen.getByRole('textbox', { name: "Model" });
        const statusInput = screen.getByRole('textbox', { name: "Status" });
        const chipsetInput = screen.getByRole('textbox', { name: "Chipset" });
        const locationInput = screen.getByRole('textbox', { name: "Location" });

        expect(idInput).toHaveValue("");
        expect(makeInput).toHaveValue("");
        expect(modelInput).toHaveValue("");
        expect(statusInput).toHaveValue("");
        expect(chipsetInput).toHaveValue("");
        expect(locationInput).toHaveValue("");   
    });

    it ('should refresh the page when successful', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve());

        const { getByLabelText } = render(<SessionProvider session={session}><Create/></SessionProvider>);

        fireEvent.change(getByLabelText('ID'), { target: { value: device.id } });
        fireEvent.change(getByLabelText('Make'), { target: { value: device.make } });
        fireEvent.change(getByLabelText('Model'), { target: { value: device.model } });
        fireEvent.change(getByLabelText('Status'), { target: { value: device.status } });
        fireEvent.change(getByLabelText('Location'), { target: { value: device.location } });

        const submitButton = screen.getByRole('button', { name: "Create" });
        fireEvent.click(submitButton);

        await waitFor(() => expect(fetch).toBeCalledTimes(1));
        expect(Router.push).toHaveBeenCalledWith("/");
    })

    it('should handle errors', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject('API Error'));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        const { getByLabelText } = render(<SessionProvider session={session}><Create/></SessionProvider>);

        fireEvent.change(getByLabelText('ID'), { target: { value: device.id } });
        fireEvent.change(getByLabelText('Make'), { target: { value: device.make } });
        fireEvent.change(getByLabelText('Model'), { target: { value: device.model } });
        fireEvent.change(getByLabelText('Status'), { target: { value: device.status } });
        fireEvent.change(getByLabelText('Location'), { target: { value: device.location } });

        // Submit form
        const submitButton = screen.getByRole('button', { name: "Create" });
        fireEvent.click(submitButton);

        // Wait for the submit to finish
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(consoleErrorSpy).toHaveBeenCalledWith('API Error');
    });
});