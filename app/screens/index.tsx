import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

export default function Pellek() {
  const [selectedValue, setSelectedValue] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar : </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue(itemValue)
          }
        >
          <Picker.Item label="test11" value="1" />
          <Picker.Item label="test22" value="2" />
          <Picker.Item label="test33" value="3" />
          <Picker.Item label=".€€€€©©•" value="4" />
        </Picker>
      </View>
      <Button
        title="ir pa Three"
        onPress={() => router.push("/screens/three")}
      />
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
    width: "8%",
    height: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: 20,
  },
});
