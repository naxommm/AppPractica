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
  /* const apiUrl2 = "http://127.0.0.1:8000/"; */
  /* http://127.0.0.1:8000/docs#/ */

  //variable para mostrar lo de la api
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
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
      .min(5, 'Mínimo 5 caracteres')
      .max(10, 'Máximo 20 caracteres'),
    password: yup.string()
      .required('Contraseña requerida')
      .min(5, 'Mínimo 5 caracteres'),
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
    
    //al  momento de hacer el submit se envia el formulario con los datos
    onSubmit: async (values) => {  
      try {

        // Envia los datos a la api por un post
        const response = await axios.post(
          "http://127.0.0.1:8000/login",
          {
            username: values.username,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        // Muestra la respuesta en consola + la respuesta de la api
        console.log("Respuesta de la API:", response.data);
        
        // Navega a la siguiente pantalla si es exitoso transportanto el valor de username
        navigation.navigate("two", { username: values.username });
      } catch (error: any) {
        console.error("Error al enviar datos:", error.response?.data || error.message);
      }
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
          left={<TextInput.Icon icon="account" color={formik.errors.username ? 'red' : 'black'} />}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
          helperTextStyle={{ color: 'red' }}
        />

        <TextInput
          label="Contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="lock" color={formik.errors.password ? 'red' : 'black'} />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
              color={formik.errors.password ? 'red' : 'black'}
            />
          }
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          helperTextStyle={{ color: 'red' }}
        />

        <Button
          mode="contained"
          onPress={formik.handleSubmit}
          style={[
            styles.button,
            { backgroundColor: (!formik.isValid || !formik.dirty) ? 'gray' : '#6200ee' }
          ]}
          contentStyle={styles.buttonContent}
          disabled={!formik.isValid || !formik.dirty}
          labelStyle={{ color: 'white' }}
        >
          Ingresar
        </Button>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  helperText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
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
