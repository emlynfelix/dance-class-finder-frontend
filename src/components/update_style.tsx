import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { IStyle, StyleService } from '../services/styles.service'
import { useNavigate } from 'react-router-dom';

const UpdateStyle = () => {
  let navigate = useNavigate();
  const styleService = new StyleService();

  const [currentId, setNewId]: [number, (value: number) => void] = useState(-1);
  const [currentName, setNewName]: [string, (value: string) => void] = useState('');

  const onChangeName = (value: string) => setNewName(value);

  useEffect(() => {
    if (localStorage.getItem('Style') == null) {
      return;
    }
    const style: any = JSON.parse(localStorage.getItem('Style') as string);
    setNewId(style.id);
    setNewName(style.name);
  }, []);

  const putData = () => {
    const style: IStyle = {
        name: currentName,
    };
    styleService.update(currentId, style)
    .then(() => {
      navigate('/read-style');
    });
  };

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input value={currentName} onChange={(e) => onChangeName(e.target.value)} />
      </Form.Field>
      <Button onClick={(e) => navigate('/read-style')} type='submit'>Cancel</Button><Button onClick={putData} type='submit'>Submit</Button>
    </Form>
  );
}

export default UpdateStyle;
