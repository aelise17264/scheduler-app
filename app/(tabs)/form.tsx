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
  ScrollView,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Header } from "react-native-elements";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

const windowWidth = Dimensions.get("window").width;

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
  formType: Yup.string().required(),
  location: Yup.string().required(),
  address: Yup.string(),
  appointment: Yup.date().default(function () {
    return new Date();
  }),
});

function EmailForm() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [dropDownList, setDropDownList] = useState<ItemType<string>[]>([
    { label: "Will", value: "will" },
    { label: "Quickclaim Deed", value: "qDate" },
    { label: "Affidavit", value: "affidavit" },
    { label: "Power of Attorney", value: "powerOfAttorney" },
    { label: "Deed of Trust", value: "deed" },
    { label: "Parental Consent for Travel", value: "parentalConsent" },
    { label: "Temporary Guardianship Agreement", value: "tempGuardianship" },
    { label: "Other", value: "other" },
  ]);
  const [selectedValue, setSelectedValue] = useState(null);

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
      <View>
        <Formik
          onSubmit={(values: any) => {
            alert(JSON.stringify(values, null, 2));

            const subject = "New Notary Appointment Request";
            const body = `
          Name: ${values.name}
          Email: ${values.email}
          Appointment: ${values.appointment.toLocaleString()}
          Form Type: ${values.formType}
          Location: ${values.address}
          `;
            const email = `mailto:abrander.notary@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            Linking.openURL(email);
          }}
          initialValues={{
            name: "",
            email: "",
            appointment: new Date(),
            formType: "",
            address: "TBD",
          }}
          validationSchema={validationSchema}
          // style={styles.form}
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
              <View>
                <View style={styles.topForm}>
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
                  {/* <Text >Select a service:</Text> */}
                  <DropDownPicker
                    open={openList}
                    value={selectedValue}
                    items={dropDownList}
                    setOpen={setOpenList}
                    setValue={(nv) => {
                      const newValue = nv(values.formType);
                      setFieldValue("formType", newValue);
                      setSelectedValue(newValue);
                    }}
                    setItems={setDropDownList}
                    placeholder="Select a service:"
                  />
                </View>
                <View style={{ justifyContent: "space-evenly", marginTop: 5 }}>
                  <RadioButton.Group
                    onValueChange={(newValue) => {
                      (setFieldValue("location", newValue),
                        setFieldValue("address", ""),
                        setShowAddress(!showAddress));
                    }}
                    value={values.location}
                  >
                    <View style={styles.radioOption}>
                      <View style={styles.travel1}>
                        <RadioButton value="1" />
                        <Text>You pick the place</Text>

                        {showAddress && (
                          <TextInput
                            onChangeText={handleChange("address")}
                            onBlur={handleBlur("address")}
                            value={values.address}
                            placeholder="Where to?"
                          />
                        )}
                      </View>
                      <View style={styles.travel2}>
                        <RadioButton value="2" />
                        <Text>Meet at my office</Text>
                        <Text>
                          I'll send you the address with your confirmation
                        </Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View>
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
                          updated.setHours(date.getHours(), date.getMinutes());
                          setFieldValue("appointment", updated);
                        }
                        if (Platform.OS === "android") setShowTimePicker(false);
                      }}
                    />
                  )}
                </View>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: "auto",
    marginLeft: "auto",
    width: windowWidth,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginVertical: "auto",
    height: 200,
    padding: 20,
    justifyContent: "flex-start",
    textAlign: "center",
  },
  topForm: {
    textAlign: "center",

    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "yellow",
  },
  radioOption: {
    flexDirection: "row",

    justifyContent: "space-between",
    borderColor: "black",
    padding: 5,
  },
  travel1: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingLeft: 25,
  },
  travel2: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default EmailForm;
