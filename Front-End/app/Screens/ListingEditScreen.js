import React, { useState } from "react";
import { StyleSheet } from "react-native";

import * as Yup from "yup";
import {
  AppForm,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/Forms";

import Screen from "../components/Screen";
import CategoryItemPicker from "../components/CategoryItemPicker";
import FormImagePicker from "../components/Forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import listings from "../api/listings";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  description: Yup.string().label("Description"),
  images: Yup.array().min(1, "Please select atleast one image"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  title: Yup.string().required().min(1).label("Title"),
});

const categories = [
  {
    label: "Furniture",
    value: 1,
    icon: "floor-lamp",
    backgroundColor: "red",
  },
  { label: "Cars", value: 2, icon: "car", backgroundColor: "green" },
  { label: "Cameras", value: 3, icon: "camera", backgroundColor: "blue" },
  { label: "Games", value: 4, icon: "cards-outline", backgroundColor: "red" },
  {
    label: "Clothing",
    value: 5,
    icon: "shoe-heel",
    backgroundColor: "green",
  },
  {
    label: "Sports",
    value: 6,
    icon: "basketball",
    backgroundColor: "blue",
  },
  {
    label: "Movies & Music",
    value: 7,
    icon: "music",
    backgroundColor: "red",
  },
  {
    label: "Books",
    value: 8,
    icon: "book-open-variant",
    backgroundColor: "green",
  },
  { label: "Others", value: 9, icon: "application", backgroundColor: "blue" },
];

function ListingEditScreen() {
  const location = useLocation();

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setprogress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setprogress(0);
    setUploadVisible(true);
    const result = await listings.addListings(
      { ...listing, location },
      (progrress) => setprogress(progrress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }
    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColums={3}
          PickerItemComponent={CategoryItemPicker}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiLine
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
