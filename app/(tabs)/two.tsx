import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Card, IconButton, Button, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
/* import { router } from 'expo-router';  */
import {  useNavigation } from '@react-navigation/native';

const MyComponent = () => (
  <View style={styles.container}>
    <Avatar.Icon size={64} icon="account-hard-hat" color="white" />
    <Divider />
    <Card.Title
      title="Card Title1"
      left={(props) => ( 
        <TouchableOpacity onPress={() => navigation.navigate('three')}>
          <Avatar.Icon {...props} icon="folder" color="green" />
        </TouchableOpacity>
      )}
    />
    <Card.Title
      title="Card Title2"
      left={(props) => (
        <TouchableOpacity onPress={() => console.log("Funciona2")}>
          <Avatar.Icon {...props} icon="folder" color="orange"/>
        </TouchableOpacity>
      )}
    />
    <Card.Title
      title="Card Title3"
      left={(props) => (
        <TouchableOpacity onPress={() => console.log("Funciona3")}>
          <Avatar.Icon {...props} icon="folder" color="blue" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyComponent;
