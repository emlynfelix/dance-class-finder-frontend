import React, { useState, useEffect } from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { LocationService, ILocation } from '../services/locations.service';
import { Sort, SortConfig } from '../utils/sort';
import { useNavigate } from 'react-router-dom';

const defaultLocations:ILocation[] = [];

const ReadLocation = () => {
  let navigate = useNavigate();
  const locationService = new LocationService();
  const [APIData, setAPIData]: [ILocation[], (locations: ILocation[]) => void] = useState(defaultLocations);
  const [sortConfig, setSortConfig]: [SortConfig, (config: SortConfig) => void] = useState({key: "", direction: "ascending"});
  const sorter = new Sort(sortConfig, setSortConfig, APIData, setAPIData);
  const readData: () => void  = () => {
    locationService.getAll()
    .then(response => setAPIData(response.data))
  }
  const onEdit: (data: any) => void = (data) => {
    localStorage.setItem('Location', JSON.stringify(data));
    navigate('/update-location');
  }
  const onDelete: (id: number|undefined) => void = (id) => {
    if (id == null) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this entry?")) {
      locationService.delete(id)
      .then(() => readData());
    }
  }

  useEffect(() => {readData()}, []);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name <Icon onClick={() => sorter.requestSort("name")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell>Latitude <Icon onClick={() => sorter.requestSort("latitude")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell>Longitude <Icon onClick={() => sorter.requestSort("longitude")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell><Icon onClick={() => navigate("/create-location")} name='add' /></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        {APIData.map((data) => {
          return (
            <Table.Row>
              <Table.Cell>{data.name}</Table.Cell>
              <Table.Cell>{data.latitude}</Table.Cell>
              <Table.Cell>{data.longitude}</Table.Cell>
              <Table.Cell><Icon onClick={() => onEdit(data)} name='edit' /></Table.Cell>
              <Table.Cell><Icon onClick={() => onDelete(data.id)} name='delete' /></Table.Cell>
            </Table.Row>
          )}
        )}
      </Table.Body>
    </Table>
  );
};

export default ReadLocation;
