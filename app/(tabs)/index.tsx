import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios' ;
import { useFocusEffect } from '@react-navigation/native';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  /* //variable para el error de autenticacion, solamente funciona cuando los campos no
  coincidan con los de la api  */
  const [authError, setAuthError] = useState('');

  // 2 variables del tipo de yutu
  const [info, setInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  /* const axios = require('axios').default; */

  /* const apiUrl = "http://127.0.0.1:8000/login"; */
  //http://172.20.2.126:8080/login 

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
    username: yup.string().required('Campo Obligatorio')
      .min(5, 'Mínimo 5 caracteres')
      .max(10, 'Máximo 10 caracteres'),
    password: yup.string()
      .required('Campo Obligatorio')
      .min(5, 'Mínimo 5 caracteres')
      .max(10, 'Máximo 10 caracteres'),
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
      navigation.navigate("two", { username: values.username });

      /* try {

        // Envia los datos a la api por un post
        const response = await axios.post(
          "http://127.0.0.1:8000/login",
          //http://172.20.2.126:8080/login 
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
        //se muestra el mensaje que contiene setautherror al momento de que no coinciden los caracteres con la api
        setAuthError('Credenciales inválidas');
      } */
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      // Resetea los valores del form
      formik.resetForm(); 
      // Limpia el mensaje de error de autenticación
      setAuthError(''); 
    }, [])
  );

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
          maxLength={11}
        />
        {/* Mostrar mensajes de error de formik */}
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}

        <TextInput
          label="Contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          maxLength={11}
          left={<TextInput.Icon icon="lock" color={formik.errors.password ? 'red' : 'black'} />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
              color={formik.errors.password ? 'red' : 'black'}
            />
          }
          error={formik.touched.password && !!formik.errors.password}
          />
          {/* Mostrar mensajes de error de formik */}
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}

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
        {/* Mostrar mensaje de error de autenticación */}
        {authError ? (
          <Text style={styles.authErrorText}>{authError}</Text>
        ) : null}
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  authErrorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginForm;
