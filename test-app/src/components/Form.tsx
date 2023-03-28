import React from "react";
import { DeviceProps } from "./Device";

interface Props {
    deviceValues: DeviceProps;
    onSubmit: (values: DeviceProps) => void;
    idUnvailable: boolean; // Stop people editing unique ID
}

// Form for creating and editing devices
export const Form: React.FC<Props> = ({ deviceValues, onSubmit, idUnvailable }) => {
    const [device, setDevice] = React.useState<DeviceProps>(deviceValues);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(device);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDevice({ ...device, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} data-testid={"Form"}>
          <label>ID
            <input
              name="id"
              disabled={idUnvailable}
              autoFocus
              onChange={(e) => handleChange(e)}
              placeholder="Id"
              type="text"
              value={device.id}
            />
          </label>
          <label>Make
            <input
              name="make"
              onChange={(e) => handleChange(e)}
              placeholder="Make"
              type="text"
              value={device.make}
            />
          </label>
          <label>Model
            <input
              name="model"
              onChange={(e) => handleChange(e)}
              placeholder="Model"
              type="text"
              value={device.model}
            />
          </label>
          <label>Status
            <input
              name="status"
              onChange={(e) => handleChange(e)}
              placeholder="Status"
              type="text"
              value={device.status}
            />
          </label>
          <label>Chipset
            <input
              name="chipset"
              onChange={(e) => handleChange(e)}
              placeholder="Chipset"
              type="text"
              value={device.chipset}
            />
          </label>
          <label>Location
            <input
              name="location"
              onChange={(e) => setDevice({ ...device, location: e.target.value })}
              placeholder="Location"
              type="text"
              value={device.location}
            />
          </label>
          <input
            disabled={!device.id || !device.make || !device.model || !device.status}
            type="submit"
            value="Create"
          />
        </form>
    );
};

export default Form;