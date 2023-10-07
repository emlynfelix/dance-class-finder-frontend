import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { IDanceClass, DanceClassService } from '../services/dance_classes.service'

const CreateDanceClass = () => {
  const [currentName, setNewName]: [string, (value: string) => void] = useState('');
  const [currentStartDate, setNewStartDate]: [string, (value: string) => void] = useState('');
  const [currentEndDate, setNewEndDate]: [string, (value: string) => void] = useState('');
  const [currentTeacherId, setNewTeacherId]: [number, (value: number) => void] = useState(-1);
  const [currentLocationId, setNewLocationId]: [number, (value: number) => void] = useState(-1);

  const onChangeName = (value: string) => setNewName(value);
  const onChangeStart = (value: string) => setNewStartDate(value);
  const onChangeEnd = (value: string) => setNewEndDate(value);

  const postData = () => {
    const dance_class: IDanceClass = {
        name: currentName,
        start: currentStartDate,
        end: currentEndDate,
        teacher: currentTeacherId,
        location: currentLocationId,
    };
    (new DanceClassService()).create(dance_class);
  };

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Class Name' onChange={(e) => onChangeName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>StartDate</label>
        <input type="date" onChange={(e) => onChangeStart(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>EndDate</label>
        <input type="date" onChange={(e) => onChangeEnd(e.target.value)} />
      </Form.Field>
      <Button onClick={postData} type='submit'>Submit</Button>
    </Form>
  );
}

export default CreateDanceClass;
