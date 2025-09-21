import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";

const AppointmentPicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Selected Date: {date.toLocaleDateString()}</Text>
      <Button title="Open Date Picker" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date" // Can be "date", "time", or "datetime"
      />
    </View>
  );
};
export default AppointmentPicker;
