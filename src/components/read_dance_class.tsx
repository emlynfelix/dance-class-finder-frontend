import React, { useState, useEffect } from 'react'
import { Icon, Table, SemanticICONS } from 'semantic-ui-react'
import { DanceClassService, IDanceClassView } from '../services/dance_classes.service';
import { IStyle } from '../services/styles.service';
import { Sort, SortConfig } from '../utils/sort';
import { useNavigate } from 'react-router-dom';

const defaultDanceClasses:IDanceClassView[] = [];

const ReadDanceClass = () => {
  let navigate = useNavigate();

  const danceClassService = new DanceClassService();

  const [APIData, setAPIData]: [IDanceClassView[], (danceClasses: IDanceClassView[]) => void] = useState(defaultDanceClasses);
  const [filters, setFilters]: [Map<string, number|null>, (f: Map<string, number|null>) => void] = useState(new Map());
  const [sortConfig, setSortConfig]: [SortConfig, (config: SortConfig) => void] = useState({key: "", direction: "ascending"});
  const sorter = new Sort(sortConfig, setSortConfig, APIData, setAPIData);

  const filterBy: (field: string, value: number) => void = (field, value) => {
    const newFilters = new Map(filters);
    if (value === newFilters.get(field)) {
      newFilters.set(field, null);
    }
    else {
      newFilters.set(field, value);
    }
    setFilters(newFilters);
  }
  const getFilterIcon: (field: string) => SemanticICONS = (field) => {
    if (filters.get(field)) {
      return 'table' as SemanticICONS;
    }
    return 'filter' as SemanticICONS;
  }
  const readData: () => void  = () => {
    danceClassService.getAllFiltered(filters)
    .then(response => setAPIData(response.data.data));
  }
  const onEdit: (data: any) => void = (data) => {
    localStorage.setItem('DanceClass', JSON.stringify(data));
    navigate('/update-dance-class');
  }
  const onDelete: (id: number|undefined) => void = (id) => {
    if (id == null) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this entry?")) {
      danceClassService.delete(id)
      .then(() => readData());
    }
  }

  useEffect(() => {readData()}, []);
  useEffect(() => {readData()}, [filters]);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name <Icon onClick={() => sorter.requestSort("name")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell>Start <Icon onClick={() => sorter.requestSort("start")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell>End <Icon onClick={() => sorter.requestSort("end")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell>Teacher <Icon onClick={() => sorter.requestSort("teacher.name")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell>Location <Icon onClick={() => sorter.requestSort("location.name")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell>Styles</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell><Icon onClick={() => navigate("/create-dance-class")} name='add' /></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        {APIData.map((data) => {
          return (
            <Table.Row>
              <Table.Cell>{data.name}</Table.Cell>
              <Table.Cell>{data.start}</Table.Cell>
              <Table.Cell>{data.end}</Table.Cell>
              <Table.Cell>{data.teacher.name} <Icon onClick={() => { if (data.teacher.id) { filterBy("teacher_id", data.teacher.id) } }} name={getFilterIcon("teacher_id")} /></Table.Cell>
              <Table.Cell>{data.location.name} <Icon onClick={() => { if (data.location.id) { filterBy("location_id", data.location.id) } }} name={getFilterIcon("location_id")} /></Table.Cell>
              <Table.Cell>{data.styles.map((obj: IStyle) => obj.name).join(', ')}</Table.Cell>
              <Table.Cell><Icon onClick={() => onEdit(data)} name='edit' /></Table.Cell>
              <Table.Cell><Icon onClick={() => onDelete(data.id)} name='delete' /></Table.Cell>
            </Table.Row>
          )}
        )}
      </Table.Body>
    </Table>
  );
};

export default ReadDanceClass;
