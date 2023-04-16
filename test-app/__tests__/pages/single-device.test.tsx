import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Router from "next/router";
import { devicesMock, farmMock } from "../../__mocks__/devicesMock";
import { SessionProvider } from "next-auth/react";
import SingleDevice, { getServerSideProps } from "../../src/pages/single-device/[id]";
import prisma from "../../src/lib/prisma";

// Mock the router
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockResolvedValue({pathname: "/single-device/ID1"}),
    push: jest.fn(),
}))

jest.mock("../../src/lib/prisma", () => ({
    device: {
        findUnique: jest.fn()
    },
    farm: {
        findMany: jest.fn().mockResolvedValue([
            {
                id: 1,
                floor: 3
            },
            {
                id: 2,
                floor: 4
            }
        ])
    }
}))

const session = {
    user: {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
    },
    expires: "12345",
};

const device = devicesMock[0];
const farms = farmMock;
const mockProps = {device: device, farms: farms}

// Tests /single-device/[id] file
describe("Edit/ Delete component", () => {
	test("render the single device page", () => {
		render(
			<SessionProvider session={session}>
				<SingleDevice {...mockProps} />
			</SessionProvider>
		);
		expect(screen.getByRole("heading", { name: "ID1" })).toBeInTheDocument();
	});
});

// Tests editing route
describe ("Edit component", () => {
    it("should have prefilled values so the user can edit a current device", async () => {
        // Render page
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve());
        render(<SessionProvider session={session}><SingleDevice {...mockProps}  /></SessionProvider>);

        // Edit mode
        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton);

        // Test the fields are prefilled
        expect(screen.getByLabelText("ID")).toHaveValue(device.id);
        expect(screen.getByLabelText("Make")).toHaveValue(device.make);
        expect(screen.getByLabelText("Model")).toHaveValue(device.model);
        expect(screen.getByLabelText("Status")).toHaveValue(device.status);
        expect(screen.getByLabelText("Chipset")).toHaveValue(device.chipset);
        expect(screen.getByLabelText("Location")).toHaveValue(device.location);
    });

    it("should call the edit API with the correct values", async () => {
        // Render page
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve());
        render(<SessionProvider session={session}><SingleDevice {...mockProps}  /></SessionProvider>);

        // Edit mode
        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton);

        // Set up new values
        const newModelValue = "NewModel";
        const newMakeValue = "NewMake";

        const modelField = screen.getByLabelText("Model");
        const makeField = screen.getByLabelText("Make");

        // Change the text in the make and model fields
        fireEvent.change(modelField, { target: { value: newModelValue } });
        fireEvent.change(makeField, { target: { value: newMakeValue } });

        // Test to see if the fields have the new values
        expect(makeField).toHaveValue(newMakeValue);
        expect(modelField).toHaveValue(newModelValue);

        // Test to see if the other fields have the old unchanged values
        expect(screen.getByLabelText("ID")).toHaveValue(device.id);
        expect(screen.getByLabelText("Status")).toHaveValue(device.status);
        expect(screen.getByLabelText("Chipset")).toHaveValue(device.chipset);
        expect(screen.getByLabelText("Location")).toHaveValue(device.location);

        // Submit the form
        const submitButton = screen.getByRole("button", { name: "Create" });
        fireEvent.click(submitButton);

        // Test to see if the fetch API is called with the correct values
        const apiBody = {
            "body": JSON.stringify({
                id: device.id,
                data: {
                    make: newMakeValue,
                    model: newModelValue,
                    chipset: device.chipset,
                    status: device.status,
                    availability: device.availability,
                    location: device.location,
                    farmId: device.farmId
                }
            }),
            headers: {"Content-Type": "application/json"},
            method: "POST"
        }
        
        await waitFor(() => expect(fetch).toBeCalledTimes(1));
        expect(fetch).toHaveBeenCalledWith("/api/device/ID1/edit", apiBody)

        // Test to see if it returns the user to the main page
		expect(Router.push).toHaveBeenCalledWith("/");
    });

    it("should handle errors", async () => {
        // Render page
        global.fetch = jest.fn().mockImplementation(() => Promise.reject('API Error'));
        render(<SessionProvider session={session}><SingleDevice {...mockProps} /></SessionProvider>);
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        // Edit mode
        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton);

        // Submit the form
        const submitButton = screen.getByRole("button", { name: "Create" });
        fireEvent.click(submitButton);

        // Test to see if it logs the error
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
		expect(consoleErrorSpy).toHaveBeenCalledWith("API Error");

        // Test to see if it returns the user to the main page
		expect(Router.push).toHaveBeenCalledWith("/");
    });
});

// Tests delete route
describe ("Delete component", () => {
    it("should delete the device", async () => {
        // Render page
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve());
        render(<SessionProvider session={session}><SingleDevice {...mockProps} /></SessionProvider>);

        // Click "yes" on all window confirmation message
        window.confirm = jest.fn(() => true)

        // Click Delete
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        // expect fetch to have been called to delete the item
        await waitFor(() => expect(fetch).toBeCalledTimes(1));
        // expect(fetch).toHaveBeenCalledWith("/api/device/ID1/edit", apiBody)

        // expect a confimation message to have popped up
        expect(window.confirm).toBeCalled()

        // Expect to have been relocated to main page
		expect(Router.push).toHaveBeenCalledWith("/");
    });

    it("should not delete the device when cancelled", async () => {
        // Render page
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve());
        render(<SessionProvider session={session}><SingleDevice {...mockProps}  /></SessionProvider>);

        // Click "cancel" on all window confirmation message
        window.confirm = jest.fn(() => false)

        // Click Delete
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        // expect a confimation message to have popped up
        expect(window.confirm).toBeCalled()

        // expect fetch to not have been called
        await waitFor(() => expect(fetch).toBeCalledTimes(0));

        // Expect to have been relocated to main page
		expect(Router.push).toHaveBeenCalledWith("/");
    });
});

describe("Server side props", () => {
    it("Should mock the correct device", async () => {
        const context = {
            params: {
                id: "ID1"
            }
        }
        prisma.device.findUnique.mockResolvedValue(device);
    
        const props = await getServerSideProps(context);
        expect(prisma.device.findUnique).toHaveBeenCalledWith({"where": context.params});
        expect(props).toEqual({props: {...mockProps}})
    });

    it("Should mock the correct device given a list of params", async () => {
        const context = {
            params: {
                id: ["ID1"]
            }
        }
        prisma.device.findUnique.mockResolvedValue(device);
    
        const props = await getServerSideProps(context);
        expect(prisma.device.findUnique).toHaveBeenCalledWith({"where": {id: 'ID1'}});
        expect(props).toEqual({props: mockProps})
    })
})