import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function DatePicker({ date, onClose, onChange }) {

    const [dateNow, setDateNow] = useState(new Date(date));

    return (
        <View style={styles.container}>
            <DateTimePicker
                value={dateNow}
                mode='date'
                display='default'
                // onChange={(e, d) => {
                //     const currentDate = d || dateNow
                //     setDateNow(currentDate)
                //     onChange(currentDate)
                // }}
                style={{ backgroundColor: '#FFF' }}
                onChange={onChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'absolute',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
    },
})