import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { Button, TextInput, Checkbox, TouchableRipple  } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Camera, useCameraPermissions, CameraView } from "expo-camera";
import * as yup from "yup";

type Prop = {
  type: string;
  data: string;
};

export default function Pellek() {

  //variable de los checkbox
  const [reproceso, setReproceso] = useState(false);
  const [compraFrl, setCompraFrl] = useState(false);
  
  const [showCamera, setShowCamera] = useState(false);
  const [permission,requestPermission] = useCameraPermissions();
  const [scanned,setScanned] = useState(false);

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
    barcode: yup
    .string()
    .required("El código de barras es obligatorio"),
    
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
      Alert.alert("Ingreso exitoso", "Los datos han sido registrados correctamente");
      resetForm();
      setBarcode("");
    },
  });

  const handleBarCodeScanned = ({ type, data }: Prop) => {
    setScanned(true);
    setBarcode(data);
    formik.setFieldValue("barcode", data);
    setShowCamera(false);
    Alert.alert(
      `Código ${type} Escaneado`, 
      `Datos: ${data}`,
      [{ text: 'OK', onPress: () => setScanned(false) }],
      { cancelable: false }
    );
  };

  // solicitar permiso de la camara
  if (!permission) {
    return <View />;
  }

 
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Permiso de cámara no concedido</Text>
        <Button mode="contained" onPress={requestPermission}>
          Solicitar Permiso
        </Button>
      </View>
    );
  }

  return showCamera ? (
    <View style={{ flex: 1 }}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.layerContainer}>
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </View>
      </CameraView>

      {/* Boton para volver al form */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setShowCamera(false)}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Codigo de Barras"
        value={barcode}
        
        onChangeText={(text) => {
          setBarcode(text);
          formik.setFieldValue("barcode", text);
        }}
        onBlur={formik.handleBlur("barcode")}
        mode="outlined"
        style={{ marginBottom: 10 }}
        error={formik.touched.barcode && !!formik.errors.barcode}
        left={
          <TextInput.Icon
            icon="camera"
            onPress={() => {
              setShowCamera(true);
              setScanned(false);
            }}
          />
        }
      />
      {formik.touched.barcode && formik.errors.barcode && (
        <Text style={{ color: "red" }}>{formik.errors.barcode}</Text>
      )}

      <TextInput
        label="Cantidad"
        value={formik.values.cantidad}
        onChangeText={formik.handleChange("cantidad")}
        onBlur={formik.handleBlur("cantidad")}
        mode="outlined"
        style={{ marginBottom: 10 }}
        keyboardType="numeric"
        error={formik.touched.cantidad && !!formik.errors.cantidad}
      />
      {formik.touched.cantidad && formik.errors.cantidad && (
        <Text style={{ color: "red" }}>{formik.errors.cantidad}</Text>
      )}


      <TextInput
        label="Fecha seleccionada"
        value={formik.values.date}
        mode="outlined"
        style={styles.textInput}
        contentStyle={styles.inputContent}
        outlineStyle={styles.inputOutline}
        editable={false}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setShowDatePicker(true)}
          />
        }
        error={formik.touched.date && !!formik.errors.date}
        pointerEvents="none" // Permite que el icono sea clickeable
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {formik.touched.date && formik.errors.date && (
        <Text style={styles.errorText}>{formik.errors.date}</Text>
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formik.values.productType}
          onValueChange={(itemValue) =>
            formik.setFieldValue("productType", itemValue)
          }
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
      </View>

      {/* Checkbox de reproceso y compra FRL */}
      <TouchableRipple
        onPress={() =>
          formik.setFieldValue("reproceso", !formik.values.reproceso)
        }
        style={styles.checkboxContainer}
      >
        <View style={styles.row}>
          <Checkbox
            status={formik.values.reproceso ? "checked" : "unchecked"}
            onPress={() =>
              formik.setFieldValue("reproceso", !formik.values.reproceso)
            }
            color="blue"
          />
          <Text style={styles.label}>Reproceso</Text>
        </View>
      </TouchableRipple>

      <TouchableRipple
        onPress={() =>
          formik.setFieldValue("compraFrl", !formik.values.compraFrl)
        }
        style={styles.checkboxContainer}
      >
        <View style={styles.row}>
          <Checkbox
            status={formik.values.compraFrl ? "checked" : "unchecked"}
            onPress={() =>
              formik.setFieldValue("compraFrl", !formik.values.compraFrl)
            }
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
    </View>
  );
}

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
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 56,
    paddingHorizontal: 16,
  },
  pickerItem: {
    fontSize: 16,
    color: '#333',
  },
  placeholderItem: {
    fontSize: 16,
    color: '#999',
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
  permissionText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    fontWeight: '600',
    lineHeight: 24
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerCenter: {
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focused: {
    width: 350,
    height: 200,
    borderWidth: 2,
    borderColor: 'cyan',
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  layerContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputOutline: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
});
