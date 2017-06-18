import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default props => (
  <FormGroup>
    <FormControl
      id={props.id}
      type="number"
      value={props.input}
      onChange={({ target: { value } }) => props.onChange(value)}
      placeholder={props.placeholder}
    />
  </FormGroup>
);
