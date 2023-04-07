import React from "react";
import { DeviceProps, FarmProps } from "./Device";
import styles from "../styles/form.module.css";

interface Props {
  deviceValues: DeviceProps;
  farmValues: FarmProps[];
  onSubmit: (values: DeviceProps) => void;
  idUnvailable: boolean; // Stop people editing unique ID
}

// Form for creating and editing devices
export const Form: React.FC<Props> = ({ deviceValues, farmValues, onSubmit, idUnvailable }) => {
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
    <form onSubmit={handleSubmit} data-testid={"Form"} className={styles.form}>
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
      <label>Farm
        <select
          name="farm"
          id="farm"
          value={device.farmId}
          onChange={(e) => setDevice({ ...device, farmId: parseInt(e.target.value) })}
        >
          {farmValues.map((farm) => (
            <option key={farm.id} value={farm.id}>
              {farm.id}: Floor {farm.floor}
            </option>
          ))}
        </select>
      </label>
      <input
        className={styles.button}
        disabled={!device.id || !device.make || !device.model || !device.status}
        type="submit"
        value="Create"
      />
    </form>
  );
};

export default Form;