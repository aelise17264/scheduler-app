import React, { useState } from "react";
import {
  View,
  Button,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Header } from "react-native-elements";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const AppHeader = (props: any) => {
  return (
    <Header
      backgroundColor="#BBDCE5"
      leftComponent={{ icon: "menu", color: "black" }}
      centerComponent={{ text: "Notary Public" }}
      rightComponent={{ icon: "home" }}
      {...props}
    />
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .required()
    .email("That's not the right format for am email"),
  appointment: Yup.date().default(function () {
    return new Date();
  }),
});

function EmailForm() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const showFormAlert = () => {
    Alert.alert(
      "Missing Info",
      "Looks like you missed something on this form. Please fill out every section before clicking Submit.",
      [
        {
          text: "OK",
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <>
      <AppHeader />
      <Formik
        onSubmit={(values: any) => {
          alert(JSON.stringify(values, null, 2));

          const subject = "New Notary Appointment Request";
          const body = `
          Name: ${values.name}
          Email: ${values.email}
          Appointment: ${values.appointment.toLocaleString()}
          `;
          const email = `mailto:abrander.notary@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          Linking.openURL(email);
        }}
        initialValues={{ name: "", email: "", appointment: new Date() }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <View style={styles.content}>
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Your Name"
                autoCapitalize="words"
              />
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Your Email"
              />
              <Button
                title="Pick a Date"
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={values.appointment}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    if (event.type === "set" && date) {
                      const updated = new Date(values.appointment);
                      updated.setFullYear(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                      );
                      setFieldValue("appointment", updated);
                    }
                    if (Platform.OS === "android") setShowDatePicker(false);
                  }}
                />
              )}

              {/* Time Picker */}
              <Button
                title="Pick a Time"
                onPress={() => setShowTimePicker(true)}
              />
              {showTimePicker && (
                <DateTimePicker
                  value={values.appointment}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    if (event.type === "set" && date) {
                      const updated = new Date(values.appointment);
                      updated.setHours(
                        date.getHours(),
                        date.getMinutes(),
                      );
                      setFieldValue("appointment", updated);
                    }
                    if (Platform.OS === "android") setShowTimePicker(false);
                  }}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  if (errors.email || errors.name || errors.appointment) {
                    showFormAlert();
                  } else {
                    handleSubmit();
                  }
                }}
                title="Submit"
              />
              <Text style={{ fontSize: 20 }}>
                {JSON.stringify(values, null, 2)}
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 20,
  },
});

export default EmailForm;
