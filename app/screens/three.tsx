import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ThreeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed vero error ducimus reiciendis. Deserunt, atque animi quibusdam, perspiciatis numquam ex non incidunt et cupiditate asperiores qui unde praesentium a ipsum?</Text>
            <Text style={styles.subtitle}>Explore and discover amazing features</Text>
            <Button
                title="Devolverse"
                onPress={() => router.back()}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});