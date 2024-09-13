import React from "react";
import { useFormikContext } from "formik";

import AppTextinput from "../AppTextinput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, width, ...otherProps }) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();
  return (
    <>
      <AppTextinput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
