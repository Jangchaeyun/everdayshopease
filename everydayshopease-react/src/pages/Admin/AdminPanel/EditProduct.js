import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const EditProduct = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled label="아이디" source="id" />
        <TextInput label="이름" source="name" />
        <TextInput label="설명" source="description" />
        <TextInput label="가격" source="price" type="number" />
        <TextInput disabled label="슬러그" source="slug" />
        <TextInput label="브랜드" source="brand" />
      </SimpleForm>
    </Edit>
  );
};

export default EditProduct;
