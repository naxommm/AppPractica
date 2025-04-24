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
    <View style={{ alignItems: "center" }}>
      <Avatar.Icon size={64} icon="account-hard-hat" color="white" />

      {/* mostrar el username mandando de la pantalla de index por la api */}
      <Text style={{ marginTop: 8 }}>
        {username || "Usuario no indefinido"}
      </Text>
    </View>

    <Divider />

    {/* Los touchableopacity estan dentro de un card, y al hacer click */}

    <TouchableOpacity
      onPress={() => router.push("/screens")}
      activeOpacity={0.4}
    >
      <Card.Title
        title="Ingreso Pellet"
        titleStyle={styles.cardTitle}
        left={(props) => (
          <Avatar.Icon {...props} icon="barcode" color="#0e0200" />
        )}
        style={styles.cardContainer}
      />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => router.push("../screens/produccion")}
      activeOpacity={0.7}
    >
      <Card.Title
        title="Produccion"
        titleStyle={styles.cardTitle}
        left={(props) => (
          <Avatar.Icon {...props} icon="folder" color="#f8f32b" />
        )}
        style={styles.cardContainer}
      />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => router.push("../screens/leyKarin")}
      activeOpacity={0.7}
    >
      <Card.Title
        title="Ley Karin"
        titleStyle={styles.cardTitle}
        left={(props) => (
          <Avatar.Icon {...props} icon="book" color="#009b7d" />
        )}
        style={styles.cardContainer}
      />
    </TouchableOpacity>

    
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  cardTitle: {
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#333", 
 
  },
  cardContainer: {
    width: '100%', // Ocupa todo el ancho disponible
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center', // Centra el contenido horizontalmente
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff', // Fondo blanco para mejor contraste
    borderRadius: 8, // Bordes redondeados
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default MyComponent;
