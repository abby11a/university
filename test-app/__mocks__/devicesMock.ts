export const devicesMock = [
    {
        id: "ID1",
        make: "Sony",
        model: "123",
        chipset: "abc",
        status: "Available",
        availability: true,
        location: "1290",
        farmId: 1,
        farm: {
            id: 1,
            floor: 2
        }
    },
    {
        id: "ID2",
        make: "Sony",
        model: "123",
        chipset: "abc",
        status: "Available",
        availability: true,
        location: "1290",
        farmId: 2,
        farm: {
            id: 2,
            floor: 3
        }
    }
]

export const emptyDeviceMock = [
    {
        id: "",
        make: "",
        model: "",
        chipset: "",
        status: "",
        availability: true,
        location: "",
        farmId: 0
    }
]

export const farmMock = [
    {
        id: 1,
        floor: 3
    },
    {
        id: 2,
        floor: 4
    }
]