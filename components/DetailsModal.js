import React, { useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    Dimensions,
    TextInput,
} from 'react-native';
import IconFromFA from 'react-native-vector-icons/FontAwesome';
import TimeRangePicker from 'react-native-range-timepicker';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DetailsModal = props => {
    const minDate = new Date();
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    const [vehicleType, setVehicleType] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [visible, setVisible] = React.useState(false);

    const onSelect = time => {
        console.log('time-', time);
        var tempSelectedTime = [];
        tempSelectedTime.push(time);
        props.setSelectedTime([...tempSelectedTime]);
        console.log('selectedtime-', props.selectedTime);
        setVisible(false);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.Open}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    props.setOpen(!props.Open);
                }}>
                <View style={styles.centeredView}>
                    <Pressable
                        onPress={() => props.setOpen(!props.Open)}
                        style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <IconFromFA name={'close'} color={'#eb022a'} size={18} />
                    </Pressable>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.modalHeadline}>Type of Vehicle</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setVehicleType}
                            value={vehicleType}
                            placeholder="e.g. car, bike etc."
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.modalHeadline}>Time period of parking</Text>
                        <Pressable style={{ marginVertical: 10 }} onPress={() => setVisible(true)}>
                            <Text style={styles.inputText}>
                                {props.SelectedTime.length > 0
                                    ? props.SelectedTime[0].startTime +
                                    ' - ' +
                                    props.SelectedTime[0].endTime
                                    : 'Select Time period'}
                            </Text>
                        </Pressable>
                        <TimeRangePicker
                            visible={visible}
                            onClose={onClose}
                            onSelect={onSelect}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.modalHeadline}>Date of parking</Text>
                        <Pressable
                            style={{ marginVertical: 10 }}
                            onPress={() => props.setShowDatePicker(true)}>
                            {console.log('props.sleectedDate', props.SelectedDate)}
                            <Text style={styles.inputText}>
                                {props.SelectedDate.length > 0
                                    ? props.SelectedDate[0].start +
                                    ' - ' +
                                    props.SelectedDate[0].end
                                    : 'Select a Date'}
                            </Text>
                        </Pressable>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.modalHeadline}>Vehicle Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setVehicleNumber}
                            value={vehicleNumber}
                            placeholder="DL4S-8088"
                        />
                    </View>
                    <Pressable
                        onPress={() => {
                            props.setLocked(true);
                            props.setOpen(false);
                        }}
                        style={styles.buttonSubmit}>
                        <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        margin: 22,
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeadline: {
        color: '#eb022a',
        fontSize: 18,
        fontWeight: '700',
    },
    input: {
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        backgroundColor: 'white',
    },
    inputText: {
        color: 'black'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonSubmit: {
        backgroundColor: '#eb022a',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        margin: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default DetailsModal;
