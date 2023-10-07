import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { ILocation, LocationService } from '../services/locations.service'
import { useNavigate } from 'react-router-dom';

const CreateLocation = () => {
  let navigate = useNavigate();

  const [currentName, setNewName]: [string, (value: string) => void] = useState('');
  const [currentLatitude, setNewLatitude]: [number, (value: number) => void] = useState(-1);
  const [currentLongitude, setNewLongitude]: [number, (value: number) => void] = useState(-1);

  const onChangeName = (value: string) => setNewName(value);
  const onChangeLatitude = (value: string) => setNewLatitude(parseFloat(value));
  const onChangeLongitude = (value: string) => setNewLongitude(parseFloat(value));

  const postData = () => {
    const location: ILocation = {
        name: currentName,
        latitude: currentLatitude,
        longitude: currentLongitude,
    };
    (new LocationService()).create(location)
    .then(() => {
      navigate('/read-location');
    });
  };

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Location Name' onChange={(e) => onChangeName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Latitude</label>
        <input placeholder='0' onChange={(e) => onChangeLatitude(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Longitude</label>
        <input placeholder='0' onChange={(e) => onChangeLongitude(e.target.value)} />
      </Form.Field>
      <Button onClick={postData} type='submit'>Submit</Button>
    </Form>
  );
}

export default CreateLocation;
