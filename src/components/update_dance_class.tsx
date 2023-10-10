import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { IDanceClass, DanceClassService } from '../services/dance_classes.service';
import { ILocation, LocationService } from '../services/locations.service';
import { ITeacher, TeacherService } from '../services/teachers.service';
import { useNavigate } from 'react-router-dom';

const defaultLocations:ILocation[] = [];
const defaultTeachers:ITeacher[] = [];

const UpdateDanceClass = () => {
  let navigate = useNavigate();
  const danceClassService = new DanceClassService();
  const locationService = new LocationService();
  const teacherService = new TeacherService();

  const [currentId, setNewId]: [number, (value: number) => void] = useState(-1);
  const [currentName, setNewName]: [string, (value: string) => void] = useState('');
  const [currentStart, setNewStart]: [Date, (value: Date) => void] = useState(new Date());
  const [currentEnd, setNewEnd]: [Date, (value: Date) => void] = useState(new Date());
  const [currentLocationId, setNewLocationId]: [number, (value: number) => void] = useState(-1);
  const [currentTeacherId, setNewTeacherId]: [number, (value: number) => void] = useState(-1);
  const [locations, setLocations]: [ILocation[], (locs: ILocation[]) => void] = useState(defaultLocations);
  const [teachers, setTeachers]: [ITeacher[], (t: ITeacher[]) => void] = useState(defaultTeachers);

  useEffect(() => {
    if (localStorage.getItem('DanceClass') == null) {
      return;
    }
    const danceClass: any = JSON.parse(localStorage.getItem('DanceClass') as string);
    setNewId(danceClass.id);
    setNewName(danceClass.name);
    setNewStart(new Date(danceClass.start));
    setNewEnd(new Date(danceClass.end));
    setNewTeacherId(danceClass.teacher.id);
    setNewLocationId(danceClass.location.id);
  }, []);

  const putData = () => {
    const danceClass: IDanceClass = {
        name: currentName,
        start: currentStart.toISOString(),
        end: currentEnd.toISOString(),
        location_id: currentLocationId,
        teacher_id: currentTeacherId,
    };
    danceClassService.update(currentId, danceClass)
    .then(() => {
      navigate('/read-dance-class');
    });
  };

  useEffect(() => {
    locationService.getAll()
    .then((response) => setLocations(response.data));
  }, []);
  useEffect(() => {
    teacherService.getAll()
    .then((response) => setTeachers(response.data));
  }, []);

  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input value={currentName} onChange={(e) => setNewName(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Start</label>
        <DatePicker
          selected={currentStart}
          onChange={(date) => { if (date) { setNewStart(date) } }}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </Form.Field>
      <Form.Field>
        <label>End</label>
        <DatePicker
          selected={currentEnd}
          onChange={(date) => { if (date) { setNewEnd(date) } }}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </Form.Field>
      <Form.Field>
        <label>Teacher</label>
        <Dropdown
          value={currentTeacherId}
          onChange={(e, data) => { if (data.value) { setNewTeacherId(data.value as number) } }}
          fluid
          selection
          options={teachers.map((obj) => ({key: obj.name, text: obj.name, value: obj.id}))}
        />
      </Form.Field>
      <Form.Field>
        <label>Location</label>
        <Dropdown
          value={currentLocationId}
          onChange={(e, data) => { if (data.value) { setNewLocationId(data.value as number) } }}
          fluid
          selection
          options={locations.map((obj) => ({key: obj.name, text: obj.name, value: obj.id}))}
        />
      </Form.Field>
      <Button onClick={(e) => navigate('/read-dance-class')} type='submit'>Cancel</Button><Button onClick={putData} type='submit'>Submit</Button>
    </Form>
  );
}

export default UpdateDanceClass;
