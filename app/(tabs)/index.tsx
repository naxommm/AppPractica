import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';


const LoginForm = () => {
  /* const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); */
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  //validacion con formik basica
const validationSchema = yup.object().shape({
    username: yup.string().required('Usuario requerido')
    .min (3, 'Mínimo 3 caracteres')
    .max (10, 'Máximo 20 caracteres'),
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
          left={<TextInput.Icon icon="account" color="black"/>}
          /* y ahora como podria hacer para que el momento de que haya un error me lo diga abajo del label? */
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
          onPress={formik.handleSubmit}
          style={styles.button}
          contentStyle={styles.buttonContent}
          disabled={!formik.isValid || !formik.dirty}
        >
          Ingresar
        </Button>
      </View>
    </SafeAreaView>
  );
};

// Los estilos se mantienen igual
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