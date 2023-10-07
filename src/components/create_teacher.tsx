import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { ITeacher, TeacherService } from '../services/teachers.service'
import { useNavigate } from 'react-router-dom';

const CreateTeacher = () => {
  let navigate = useNavigate();

  const [currentName, setNewName]: [string, (value: string) => void] = useState('');
  const [currentContact, setNewContact]: [string, (value: string) => void] = useState('');

  const onChangeName = (value: string) => setNewName(value);
  const onChangeContact = (value: string) => setNewContact(value);

  const postData = () => {
    const teacher: ITeacher = {
        name: currentName,
        contact: currentContact,
    };
    (new TeacherService()).create(teacher)
    .then(() => {
      navigate('/read-teacher');
    });
  };

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Teacher Name' onChange={(e) => onChangeName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Contact</label>
        <input placeholder='Contact Details' onChange={(e) => onChangeContact(e.target.value)} />
      </Form.Field>
      <Button onClick={postData} type='submit'>Submit</Button>
    </Form>
  );
}

export default CreateTeacher;
