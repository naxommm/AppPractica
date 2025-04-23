import { View, Text, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { useFormik } from 'formik';
import { Button, TextInput, Checkbox, TouchableRipple  } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Camera, useCameraPermissions } from "expo-camera";
import * as yup from "yup";


export default function Pellek() {
  
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, requestPermission] = useCameraPermissions();


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

  //variables del formik 
  const formik = useFormik({
    initialValues: {
      barcode: "",
      cantidad: "",
      date: date.toISOString().split("T")[0],
      productType: "",
      reproceso: false,
      compraFrl: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Datos enviados:", values);
      alert.alert("Ingreso exitoso", "Los datos han sido registrados correctamente");
      resetForm();
      setBarcode("");
    },
  });


  return (
      
    <View style={{ padding: 20 }}>
      <TextInput
        label="Codigo de Barras"
        value={barcode}
          onChangeText={(text) => {setBarcode(text);
          formik.setFieldValue("barcode", text);
        }}
        onBlur={formik.handleBlur('barcode')}
        mode="outlined"
        style={{ marginBottom: 10 }}
        error={formik.touched.barcode && !!formik.errors.barcode}
        left={
          <TextInput.Icon
          icon="camera"
          onPress={async () => {
            const { status } = await requestPermission();
            if (status !== 'granted') {
              Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la cámara.');
              return;
            }
    
            Alert.alert(
              'Escanear código',
              '¿Deseas abrir la cámara para escanear un código de barras?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Aceptar', onPress: () => setShowCamera(true) },
              ]
            );
          }}
          />
        }
      />
      {formik.touched.barcode && formik.errors.barcode && (
        <Text style={{ color: "red" }}>{formik.errors.barcode}</Text>
      )}

{showCamera && (
  <Camera
    style={{ flex: 1 }}
    onBarCodeScanned={({ data }) => {
      setShowCamera(false);
      setBarcode(data);
      formik.setFieldValue("barcode", data);
    }}
  />
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
        <Picker.Item label="Bolsas 15KG" value="15kg" />
        <Picker.Item label="Pallet" value="pallet" />
        <Picker.Item label="Maxi sacos 1000KG" value="1mkg" />
      </Picker>
      {formik.touched.productType && formik.errors.productType && (
        <Text style={styles.errorText}>{formik.errors.productType}</Text>
      )}

      {/* funciona solamente en android raro y muestra la fecha seleccionada */}
      <Text>selected: {date.toLocaleString()}</Text>

      {/* Checkbox de reproceso y compra FRL */}
      <TouchableRipple
        onPress={() => formik.setFieldValue("reproceso", !formik.values.reproceso)}
        style={styles.checkboxContainer}
      >
        <View style={styles.row}>
          <Checkbox
            status={formik.values.reproceso ? 'checked' : 'unchecked'}
            onPress={() => formik.setFieldValue("reproceso", !formik.values.reproceso)}
            color="blue"
          />
          <Text style={styles.label}>Reproceso</Text>
        </View>
      </TouchableRipple>

      <TouchableRipple
        onPress={() => formik.setFieldValue("compraFrl", !formik.values.compraFrl)}
        style={styles.checkboxContainer}
      >
        <View style={styles.row}>
          <Checkbox
            status={formik.values.compraFrl ? 'checked' : 'unchecked'}
            onPress={() => formik.setFieldValue("compraFrl", !formik.values.compraFrl)}
            color="blue"
          />
          <Text style={styles.label}>Compra FRL</Text>
        </View>
      </TouchableRipple>

      <Button 
        mode="contained" 
        onPress={() => {
          formik.handleSubmit();
        }}
        style={{ marginBottom: 10 }}
        disabled={!formik.isValid || !formik.dirty}
      >
        Enviar
      </Button>

      {showCamera && (
  <Camera
    style={{ flex: 1 }}
    onBarCodeScanned={({ data }) => {
      setShowCamera(false);
      setBarcode(data);
      formik.setFieldValue("barcode", data);
    }}
    barCodeScannerSettings={{
      barCodeTypes: ['code128', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code39', 'qr'], // Puedes ajustar esto
    }}
  />
)}

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
