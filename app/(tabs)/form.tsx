import React, { useState } from "react";
import {
  View,
  Button,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  Platform,
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
  return (
    <>
      <AppHeader />
      <Formik
        onSubmit={(values: any) => alert(JSON.stringify(values, null, 2))}
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
              {/* {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )} */}
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Your Email"
              />

              {/* <Button title="Request Date" onPress={() => setOpen(true)} /> */}

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
                      // update only the date part, keep time
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
                      // update only the time part, keep date
                      const updated = new Date(values.appointment);
                      updated.setHours(date.getHours(), date.getMinutes());
                      setFieldValue("appointment", updated);
                    }
                    if (Platform.OS === "android") setShowTimePicker(false);
                  }}
                />
              )}
              {/* 
              {open && (
                  <DateTimePicker
              value={values.appointment}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                if (event.type === "set" && date) {
                  // update only the time part, keep date
                  const updated = new Date(values.appointment);
                  updated.setHours(date.getHours(), date.getMinutes());
                  setFieldValue("appointment", updated);
                }
                if (Platform.OS === "android") setOpen(false);
              }}
            />
              )} */}

              {/* <AppointmentPicker /> */}
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => handleSubmit} title="Submit" />
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
