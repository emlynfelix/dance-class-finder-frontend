import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

const UpdateDanceClass = () => {
  const [currentName, setNewName]: [string, (value: string) => void] = useState('');
  const [currentStartDate, setNewStartDate]: [string, (value: string) => void] = useState('');
  const [currentEndDate, setNewEndDate]: [string, (value: string) => void] = useState('');

  const onChangeName = (value: string) => setNewName(value);
  const onChangeStart = (value: string) => setNewStartDate(value);
  const onChangeEnd = (value: string) => setNewEndDate(value);

  const putData = () => {
    axios.put('http://127.0.0.1:8000/api/dance_classes', {
      name: currentName,
      start: currentStartDate,
      end: currentEndDate
    });
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
      <Button onClick={putData} type='submit'>Submit</Button>
    </Form>
  );
}

export default UpdateDanceClass;
