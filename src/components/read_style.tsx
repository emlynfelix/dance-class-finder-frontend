import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom';
import { Icon, Popup, PopupProps, Table } from 'semantic-ui-react'
import { StyleService, IStyle } from '../services/styles.service';
import { Sort, SortConfig } from '../utils/sort';
import { useNavigate } from 'react-router-dom';

const defaultStyles:IStyle[] = [];

const ReadStyle = () => {
  let navigate = useNavigate();
  const styleService = new StyleService();
  const [popupContent, setPopupContent]: [string, (content: string) => void] = useState('Loading...');
  const [APIData, setAPIData]: [IStyle[], (styles: IStyle[]) => void] = useState(defaultStyles);
  const [sortConfig, setSortConfig]: [SortConfig, (config: SortConfig) => void] = useState({key: "", direction: "ascending"});
  const sorter = new Sort(sortConfig, setSortConfig, APIData, setAPIData);
  const readData: () => void  = () => {
    styleService.getAll()
    .then(response => setAPIData(response.data))
  }
  const onEdit: (data: any) => void = (data) => {
    localStorage.setItem('Style', JSON.stringify(data));
    navigate('/update-style');
  }
  const onDelete: (id: number|undefined) => void = (id) => {
    if (id == null) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this entry?")) {
      styleService.delete(id)
      .then(() => readData());
    }
  }
  const loadWiki: (name: string) => void = (name) => {
    styleService.get_wiki(name)
    .then((response) => setPopupContent(response.data.extract));
  }

  useEffect(() => {readData()}, []);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name <Icon onClick={() => sorter.requestSort("name")} name='sort' /></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell><Icon onClick={() => navigate("/create-style")} name='add' /></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        {APIData.map((data) => {
          return (
            <Table.Row>
              <Table.Cell>{data.name} <Popup header={`${data.name} (Wikipedia)`} content={popupContent} trigger={<Icon onMouseOver={() => loadWiki(data.name)} name='help circle' />} /></Table.Cell>
              <Table.Cell><Icon onClick={() => onEdit(data)} name='edit' /></Table.Cell>
              <Table.Cell><Icon onClick={() => onDelete(data.id)} name='delete' /></Table.Cell>
            </Table.Row>
          )}
        )}
      </Table.Body>
    </Table>
  );
};

export default ReadStyle;
