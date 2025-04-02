import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Drawer } from 'react-native-paper';



const MyComponent = () => (
   <Drawer.CollapsedItem
     focusedIcon="inbox"
     unfocusedIcon="inbox-outline"
     label="Inbox"
   />
);

export default MyComponent;