import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { IStyle, StyleService } from '../services/styles.service'
import { useNavigate } from 'react-router-dom';

const CreateStyle = () => {
  let navigate = useNavigate();
  const styleService = new StyleService();

  const [currentName, setNewName]: [string, (value: string) => void] = useState('');

  const onChangeName = (value: string) => setNewName(value);

  const postData = () => {
    const style: IStyle = {
        name: currentName,
    };
    styleService.create(style)
    .then(() => {
      navigate('/read-style');
    });
  };

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Style Name' onChange={(e) => onChangeName(e.target.value)} />
      </Form.Field>
      <Button onClick={(e) => navigate('/read-style')} type='submit'>Cancel</Button><Button onClick={postData} type='submit'>Submit</Button>
    </Form>
  );
}

export default CreateStyle;
