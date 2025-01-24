import React from "react";
import {
  ArrayInput,
  BooleanInput,
  Create,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";
import CategoryTypeInput from "./Category/CategoryTypeInput";
import { colorSeletor } from "../../../components/Filters/ColorFilter";

export const sizeSelector = [
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "85",
  "90",
  "95",
  "100",
  "105",
  "110",
  "FREE",
  "230",
  "235",
  "240",
  "245",
  "250",
  "255",
  "260",
  "265",
  "270",
  "275",
  "280",
  "285",
];

const CreateProduct = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <TextInput source="slug" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <NumberInput source="price" validate={[required()]} />
        <TextInput source="brand" validate={[required()]} />
        {/* Refer category fields */}
        <ReferenceInput source="categoryId" reference="category" />
        <CategoryTypeInput />

        <ImageInput source="thumbnail" label={"썸네일"}>
          <ImageField source="src" title="title" />
        </ImageInput>

        <ArrayInput source="variants">
          <SimpleFormIterator inline>
            <SelectInput
              source="color"
              choices={Object.keys(colorSeletor)}
              resettable
            />
            <SelectInput source="size" choices={sizeSelector} />
            <NumberInput source="stockQuantity" />
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput source="productResources">
          <SimpleFormIterator inline>
            <TextInput source="name" validate={[required()]} />
            <ImageField source="url" src="url" />
            <ImageInput source="url" label={"제품 이미지"}>
              <ImageField source="src" title="title" />
            </ImageInput>
            <SelectInput source="type" choices={["image"]} />
            <BooleanInput source="isPrimary" />
          </SimpleFormIterator>
        </ArrayInput>

        <NumberInput source="rating" />
        <BooleanInput source="newArrival" />
      </SimpleForm>
    </Create>
  );
};

export default CreateProduct;
