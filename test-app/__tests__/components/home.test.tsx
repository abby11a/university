import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '@/components/Home';

// Mock the router
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockResolvedValue({ pathname: "/" }),
  push: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
  signIn: jest.fn(),
  getSession: jest.fn(),
  getProviders: jest.fn(),
  useSession: jest.fn().mockReturnValue([{ user: { role: 'Admin' } }, false])
}));

const mockDevices = [
  {
    id: "ID1",
    make: "make1",
    model: "model1",
    chipset: "chip1",
    status: "status1",
    location: "loc1",
    availability: true,
    farmId: 1,
    farm: {
      id: 1,
      floor: 2
    }
  },
  {
    id: "ID2",
    make: "make2",
    model: "model2",
    chipset: "chip2",
    status: "status2",
    location: "loc2",
    availability: false,
    farmId: 2,
    farm: {
      id: 2,
      floor: 3
    }
  },
];

describe('Home Component', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<Home devices={mockDevices} farms={[]} />);
    expect(getByText('Devices')).toBeInTheDocument();
  });

  test('displays devices when provided', () => {
    const { getAllByTestId } = render(<Home devices={mockDevices} farms={[]} />);
    expect(getAllByTestId('device').length).toBe(2);
  });

  test('filters devices based on search criteria', async () => {
    const { getByPlaceholderText, getAllByTestId, rerender } = render(<Home devices={mockDevices} farms={[]} />);
    const searchInput = getByPlaceholderText('Search');
  
    fireEvent.change(searchInput, { target: { value: 'make1' } });
  
    rerender(<Home devices={mockDevices.filter(device => device.make.includes('make1'))} farms={[]} />);
  
    expect(getAllByTestId('device').length).toBe(1);
  });
  

  test('changes filter criteria', () => {
    const { getByText, getByTestId } = render(<Home devices={mockDevices} farms={[]} />);
    fireEvent.change(getByTestId('filter'), { target: { value: 'status' } });
    expect(getByText('All')).toBeInTheDocument();
  });
});

