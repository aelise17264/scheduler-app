import React, { useState } from "react";
import { View, Button, Pressable, Text, StyleSheet } from "react-native";
import { TextField } from "rn-material-ui-textfield";
import { Formik } from "formik";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import * as Yup from "yup";
import { compose } from "recompose";
import AppointmentPicker from "../../components/appointment-picker";

const InputContainer = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .required()
    .email("That's not the right format for am email"),
  appointment: Yup.date().default(function () {
    return new Date();
  }),
});

const EmailForm = () => (
  <Formik
    onSubmit={(values: any) => alert(JSON.stringify(values, null, 2))}
    initialValues={{ name: "", email: "", appointment: new Date() }}
    validationSchema={validationSchema}
  >
    {(props) => {
      return (
        <>
          <View style={styles.container}>
            <View style={styles.content}>
              <TextField label="name" />
              <TextField label="email " />
              <AppointmentPicker />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => props.handleSubmit} title="Submit" />
              <Text style={{ fontSize: 20 }}>
                {JSON.stringify(props, null, 2)}
              </Text>
            </View>
          </View>
        </>
      );
    }}
  </Formik>
);

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
// const EmailForm = () => {
//     // const [name, setName] = useState("");
//     return(

//         // <View>
//         //     <TextInput
//         //     placeholder='Your Name'
//         //     value='name'
//         //     onChangeText={setName}
//         //     />
//         //     <TextInput
//         //     placeholder='Your Email'
//         //     value='email'
//         //     onChangeText={}
//         //     />

//         // </View>
//     )
// }

export default EmailForm;
