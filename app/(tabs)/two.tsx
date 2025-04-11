import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, IconButton, Button, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { router } from 'expo-router';  
import { useNavigation, useRoute } from '@react-navigation/native';

// parametros de navegacion para este tsx
type TwoScreenParams = {
  username: string;
};

const MyComponent = () => {

// Obtener parámetros de la navegación
const route = useRoute();
const { username } = route.params as TwoScreenParams;

return (
  <View style={styles.container}>
    <View style={{ alignItems: 'center' }}>
      <Avatar.Icon size={64} icon="account-hard-hat" color="white" />

      {/* mostrar el username mandando de la pantalla de index por la api */}
      <Text style={{ marginTop: 8 }}>{username || 'Usuario no indefinido'}</Text>
    </View>

    <Divider />

    <Card.Title
      title="Card Title1"
      left={(props) => ( 
        <TouchableOpacity onPress={() => router.push('/screens')}>
          <Avatar.Icon {...props} icon="baguette" color="green" />
        </TouchableOpacity>
      )}
    />


    <Card.Title
      title="Card Title2"
      left={(props) => (
        <TouchableOpacity onPress={() => console.log("Funciona2")}>
          <Avatar.Icon {...props} icon="baguette" color="orange"/>
        </TouchableOpacity>
      )}
    />


    <Card.Title
      title="Card Title3"
      left={(props) => (
        <TouchableOpacity onPress={() => console.log("Funciona3")}>
          <Avatar.Icon {...props} icon="baguette" color="blue" />
        </TouchableOpacity>
      )}
    />

    <Card>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyComponent;
