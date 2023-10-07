import React, { useState, useEffect } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import { DanceClassService, IDanceClass } from '../services/dance_classes.service';

const defaultDanceClasses:IDanceClass[] = [];

const ReadDanceClass = () => {
  const [APIData, setAPIData]: [IDanceClass[], (dance_classes: IDanceClass[]) => void] = useState(defaultDanceClasses);
  useEffect(() => {
    (new DanceClassService()).getAll()
    .then(response => setAPIData(response.data));
  }, []);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Start</Table.HeaderCell>
          <Table.HeaderCell>End</Table.HeaderCell>
          <Table.HeaderCell>Teacher</Table.HeaderCell>
          <Table.HeaderCell>Location</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        {APIData.map((data) => {
          return (
            <Table.Row>
              <Table.Cell>{data.name}</Table.Cell>
              <Table.Cell>{data.start}</Table.Cell>
              <Table.Cell>{data.end}</Table.Cell>
              <Table.Cell>{data.teacher.toString()}</Table.Cell>
              <Table.Cell>{data.location.toString()}</Table.Cell>
            </Table.Row>
          )}
        )}
      </Table.Body>
    </Table>
  );
};

export default ReadDanceClass;
