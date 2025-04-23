import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Badge } from "react-native-paper";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  /* estado de visibilidad de la barra de abajo, que se modifica con
  los listeners de cada pestaña */

  const [hideTabBar, setHideTabBar] = useState(true);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        //esconde por defecto todas las barras de arriba
        headerShown: false,
        tabBarStyle: hideTabBar ? { display: "none" } : undefined,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ignisterra S.A",
          //header activo para esta pestaña
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
        listeners={{
          focus: () => setHideTabBar(true),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel: "Two",
          title: "",   
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
        listeners={{
          focus: () => setHideTabBar(false),
        }}
      />

      {/* <Tabs.Screen
        name="three"
        options={{
          title: "Tercero",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
        listeners={{
          focus: () => setHideTabBar(false),
        }}
      /> */}
    </Tabs>
  );
}
