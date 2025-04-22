import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { Button, TextInput, Checkbox, TouchableRipple  } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Camera, useCameraPermissions } from "expo-camera";
import * as yup from "yup";


export default function Pellek() {
  
  //variable de los checkbox
  const [reproceso, setReproceso] = useState(false);
  const [compraFrl, setCompraFrl] = useState(false);

  const [permission, setPermission] = useCameraPermissions();

  //variables del datetimepicker
  
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [barcode, setBarcode] = useState("");

   /* const [mode, setMode] = useState<'date' | 'time'>('date'); */
  const [show, setShow] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      formik.setFieldValue("date", selectedDate.toISOString().split("T")[0]);
    }
  };

  /* const onChange = (event, selectedDate) => {
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
  }; */

  const validationSchema = yup.object().shape({
    barcode: yup.string(),
    //validacion del campo cantidad que solo acepte numeros
    cantidad: yup
      .number()
      .typeError("Debe ser un número")
      .required("La cantidad es obligatoria")
      .positive("Debe ser un número positivo"),
    date: yup.string().required("La fecha es obligatoria"),
    productType: yup.string().required("El tipo de producto es obligatorio"),
  });

  //variables del formik para los textinput
  const formik = useFormik({
    initialValues: {
      barcode: "",
      cantidad: "",
      date: date.toISOString().split("T")[0],
      productType: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert.alert("Ingreso exitoso", "Los datos han sido registrados correctamente");
      resetForm();
      setBarcode("");
    },
  });

  //Solicitar permiso para usar la camara
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        alert('No se puede acceder a la cámara');
      }
    })();
  }, []);


  return (
      
    <View style={{ padding: 20 }}>
      <TextInput
        label="Codigo de Barras"
        value={barcode}
          onChangeText={(text) => {setBarcode(text);
          formik.setFieldValue("bardocode", text);
        }}
        onBlur={formik.handleBlur('barcode')}
        mode="outlined"
        style={{ marginBottom: 10 }}
        error={formik.touched.barcode && !!formik.errors.barcode}
      />
      {formik.touched.barcode && formik.errors.barcode && (
        <Text style={{ color: "red" }}>{formik.errors.barcode}</Text>
      )}


      <TextInput
        label="Cantidad"
        value={formik.values.cantidad}
        onChangeText={formik.handleChange('cantidad')}
        onBlur={formik.handleBlur('cantidad')}
        mode="outlined"
        style={{ marginBottom: 10 }}
        keyboardType="numeric"
        error={formik.touched.cantidad && !!formik.errors.cantidad}
      />
      {formik.touched.cantidad && formik.errors.cantidad && (
        <Text style={{ color: "red" }}>{formik.errors.cantidad}</Text>
      )}
      
      {/* Datatime picker */}
      <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        Seleccionar Fecha
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.selectedDate}>Fecha seleccionada: {formik.values.date}</Text>
      {formik.touched.date && formik.errors.date && (
        <Text style={styles.errorText}>{formik.errors.date}</Text>
      )}
      
      <Picker
        selectedValue={formik.values.productType}
        onValueChange={(itemValue) => formik.setFieldValue("productType", itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un tipo de producto" value="" />
        <Picker.Item label="Producto A" value="1" />
        <Picker.Item label="Producto B" value="2" />
        <Picker.Item label="Producto C" value="3" />
      </Picker>
      {formik.touched.productType && formik.errors.productType && (
        <Text style={styles.errorText}>{formik.errors.productType}</Text>
      )}

      {/* funciona solamente en android raro y muestra la fecha seleccionada */}
      <Text>selected: {date.toLocaleString()}</Text>

      {/* Checkbox de reproceso y compra FRL */}
      <TouchableRipple
        onPress={() => setReproceso(!reproceso)}
        style={styles.checkboxContainer}
      >
        <View style={styles.row}>
          <Checkbox
            status={reproceso ? 'checked' : 'unchecked'}
            onPress={() => setReproceso(!reproceso)}
            color="blue"
          />
          <Text style={styles.label}>Reproceso</Text>
        </View>
      </TouchableRipple>

      <TouchableRipple
        onPress={() => setCompraFrl(!compraFrl)}
        style={styles.checkboxContainer}
      >
        <View style={styles.row}>
          <Checkbox
            status={compraFrl ? 'checked' : 'unchecked'}
            onPress={() => setCompraFrl(!compraFrl)}
            color="blue"
          />
          <Text style={styles.label}>Compra FRL</Text>
        </View>
      </TouchableRipple>

      <Button 
        mode="contained" 
        onPress={() => {
          console.log("Initial Values:", formik.initialValues);
          formik.handleSubmit();
        }}
        style={{ marginBottom: 10 }}
        disabled={!formik.isValid || !formik.dirty}
      >
        Enviar
      </Button>

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
  picker: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  dateButton: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  selectedDate: {
    marginBottom: 15,
    fontSize: 16,
  },
  checkboxContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
});
