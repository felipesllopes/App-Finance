import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export default function PickerSelect({ onChange, type }) {
    return (
        <View styles={styles.container}>
            <Picker
                style={{
                    marginVertical: 20,
                    backgroundColor: '#FFF',
                }}
                selectedValue={type}
                onValueChange={(value) => onChange(value)}
            >
                <Picker.Item label="Receita" value="receita" />
                <Picker.Item label="Despesa" value="despesa" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
})