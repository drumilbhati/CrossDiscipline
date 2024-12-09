import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function DropDown(props) {
  const {onChange} = props;
  return (
    <Select
      onChange={onChange}
      placeholder={"Select subscription level"}
      indicator={<KeyboardArrowDown />}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          transform: 'rotate(0deg)',
        },
        [`&:hover .${selectClasses.indicator}`]: {
          transform: 'rotate(180deg)',
        },
        minWidth: '100%',
      }}
      
    >
      <Option value="None">None</Option>
      <Option value="Cris Formage Level 1">Cris Formage Level 1</Option>
      <Option value="Cris Formage Level 2">Cris Formage Level 2</Option>
      <Option value="Cris Formage Level 3">Cris Formage Level 3</Option>
    </Select>
  );
}