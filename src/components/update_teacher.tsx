import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { ITeacher, TeacherService } from '../services/teachers.service'
import { useNavigate } from 'react-router-dom';

const UpdateTeacher = () => {
  let navigate = useNavigate();
  const teacherService = new TeacherService();

  const [currentId, setNewId]: [number, (value: number) => void] = useState(-1);
  const [currentName, setNewName]: [string, (value: string) => void] = useState('');
  const [currentContact, setNewContact]: [string, (value: string) => void] = useState('');

  const onChangeName = (value: string) => setNewName(value);
  const onChangeContact = (value: string) => setNewContact(value);

  useEffect(() => {
    if (localStorage.getItem('Teacher') == null) {
      return;
    }
    const teacher: any = JSON.parse(localStorage.getItem('Teacher') as string);
    setNewId(teacher.id);
    setNewName(teacher.name);
    setNewContact(teacher.contact);
  }, []);

  const putData = () => {
    const teacher: ITeacher = {
        name: currentName,
        contact: currentContact,
    };
    teacherService.update(currentId, teacher)
    .then(() => {
      navigate('/read-teacher');
    });
  };

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input value={currentName} onChange={(e) => onChangeName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Contact</label>
        <input value={currentContact} onChange={(e) => onChangeContact(e.target.value)} />
      </Form.Field>
      <Button onClick={(e) => navigate('/read-teacher')} type='submit'>Cancel</Button><Button onClick={putData} type='submit'>Submit</Button>
    </Form>
  );
}

export default UpdateTeacher;
