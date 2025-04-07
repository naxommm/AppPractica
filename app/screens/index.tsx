import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { useFormik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Pellek() {
  
  //variables del datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  //variables del formik para los textinput
  const formik = useFormik({
    initialValues: {
      picker: '',
      datatime: '',
      labeltxt: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Picker"
        value={formik.values.picker}
        onChangeText={formik.handleChange('picker')}
        onBlur={formik.handleBlur('picker')}
        style={{ marginBottom: 10 }}
      />
      
      <TextInput
        label="DateTime Picker"
        value={formik.values.datatime}
        onChangeText={formik.handleChange('datatime')}
        onBlur={formik.handleBlur('datatime')}
        style={{ marginBottom: 10 }}
      />
      
      <TextInput
        label="Label Text"
        value={formik.values.labeltxt}
        onChangeText={formik.handleChange('labeltxt')}
        onBlur={formik.handleBlur('labeltxt')}
        style={{ marginBottom: 20 }}
      />
      
      {/* funciona solamente en android raro */}
      <SafeAreaView>
      <Button onPress={showDatepicker} mode="contained">Show date picker!</Button>
      <Button onPress={showTimepicker} mode="contained">Show time picker!</Button>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>

      <Button 
        mode="contained" 
        onPress={formik.handleSubmit}
      >
        Enviar
      </Button>

      <Text>selected: {date.toLocaleString()}</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  pickerContainer: {
    width: "8%",
    height: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: 20,
  },
});
