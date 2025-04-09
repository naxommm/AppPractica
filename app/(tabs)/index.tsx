import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios' ;


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  // 2 variables del tipo de yutu
  const [info, setInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  /* const axios = require('axios').default; */

  const apiUrl = "http://127.0.0.1:8000/login";
  const apiUrl2 = "http://127.0.0.1:8000/";
  /* http://127.0.0.1:8000/docs#/ */

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
     /*  const response = await axios.get(apiUrl2); */
      const data = response.data;
      console.log(data);
      
      setInfo(data);
    } catch (error: any) {
      console.log(error);

    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  //validaciones del formulario de yup
  const validationSchema = yup.object().shape({
    username: yup.string().required('Usuario requerido')
      .min(3, 'Mínimo 3 caracteres')
      .max(10, 'Máximo 20 caracteres'),
    password: yup.string()
      .required('Contraseña requerida')
      .min(6, 'Mínimo 6 caracteres'),
  });

  /* const handleLogin = () => {
    
    console.log("Username:", username);
    console.log("Password:", password);

    navigation.navigate("two");
  }; */

  //aca agarra los valores de los inputs de mas abajo para compararlos
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Datos del login:", values);
        navigation.navigate("two");
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Title style={styles.title}>Iniciar Sesión</Title>

        <TextInput
          label="Usuario"
          
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="account" color="black" />}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />

        <TextInput
          label="Contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="lock" color="black" />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          mode="contained"
          onPress={() => {formik.handleSubmit(); fetchData();}}
          style={styles.button}
          contentStyle={styles.buttonContent}
          disabled={!formik.isValid || !formik.dirty}
        >
          Ingresar
        </Button>

        <Button
          mode="contained"
          onPress={fetchData}
        >
         aaaaaaaa
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    marginHorizontal: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 28,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  buttonContent: {
    height: 50,
  },
});

export default LoginForm;
