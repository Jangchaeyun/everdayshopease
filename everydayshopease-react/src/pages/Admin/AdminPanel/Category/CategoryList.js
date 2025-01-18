import React from "react";
import { Datagrid, List, TextField } from "react-admin";

const CategoryList = () => {
  return (
    <List>
      <Datagrid>
        <TextField disabled source="id" />
        <TextField source="name" />
        <TextField source="code" />
        <TextField sorce="description" />
      </Datagrid>
    </List>
  );
};

export default CategoryList;
