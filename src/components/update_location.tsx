import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { ILocation, LocationService } from '../services/locations.service'
import { useNavigate } from 'react-router-dom';

const UpdateLocation = () => {
  let navigate = useNavigate();

  const [currentId, setNewId]: [number, (value: number) => void] = useState(-1);
  const [currentName, setNewName]: [string, (value: string) => void] = useState('');
  const [currentLatitude, setNewLatitude]: [number, (value: number) => void] = useState(-1);
  const [currentLongitude, setNewLongitude]: [number, (value: number) => void] = useState(-1);

  const onChangeName = (value: string) => setNewName(value);
  const onChangeLatitude = (value: string) => setNewLatitude(parseFloat(value));
  const onChangeLongitude = (value: string) => setNewLongitude(parseFloat(value));

  useEffect(() => {
    if (localStorage.getItem('Location') == null) {
      return;
    }
    const location: any = JSON.parse(localStorage.getItem('Location') as string);
    setNewId(location.id);
    setNewName(location.name);
    setNewLatitude(location.latitude);
    setNewLongitude(location.longitude);
  }, []);

  const putData = () => {
    const location: ILocation = {
        name: currentName,
        latitude: currentLatitude,
        longitude: currentLongitude,
    };
    (new LocationService()).update(currentId, location)
    .then(() => {
      navigate('/read-location');
    });
  };

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input value={currentName} onChange={(e) => onChangeName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Latitude</label>
        <input value={currentLatitude} onChange={(e) => onChangeLatitude(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Longitude</label>
        <input value={currentLongitude} onChange={(e) => onChangeLongitude(e.target.value)} />
      </Form.Field>
      <Button onClick={putData} type='submit'>Submit</Button>
    </Form>
  );
}

export default UpdateLocation;
