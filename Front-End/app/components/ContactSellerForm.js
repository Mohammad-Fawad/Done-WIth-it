import React from "react";
import { Keyboard, Alert, View } from "react-native";
import * as Notifications from "expo-notifications";

import { Formik } from "formik";
import messagesApi from "../api/messages";

import AppTextinput from "./AppTextinput";
import { SubmitButton } from "./Forms";

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send message to the seller");
    }
    resetForm();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was sent to the seller",
      },
      trigger: null, // Trigger immediately
    });
  };

  return (
    <Formik initialValues={{ message: "" }} onSubmit={handleSubmit}>
      {({ handleChange, values }) => (
        <View>
          <AppTextinput
            placeholder="Message"
            onChangeText={handleChange("message")}
            value={values.message}
          />
          <SubmitButton title="Contact Seller" />
        </View>
      )}
    </Formik>
  );
}

export default ContactSellerForm;
