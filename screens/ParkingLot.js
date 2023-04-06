import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    Modal,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import React, { useState, useRef, useCallback, useMemo } from 'react';
import ImageView from 'react-native-image-viewing';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconFromFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFromSL from 'react-native-vector-icons/SimpleLineIcons';
import IconFromEntypo from 'react-native-vector-icons/Entypo';
import DetailsModal from '../components/DetailsModal';
import { Banner, Button } from '@react-native-material/core';
import DatePicker from 'react-native-neat-date-picker';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ParkingLot = (props) => {
    const [visible, setIsVisible] = useState(false);
    const [position, setPosition] = useState([]);
    const [open, setOpen] = useState(false);
    const [locked, setLocked] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState([]);
    const [popup, setPopup] = useState(false);

    const onConfirm = date => {
        setShowDatePicker(false);
        console.log(date, '---', props.SelectedDate);

        var tempSelectedDate = props.SelectedDate;
        tempSelectedDate.push({
            start: date.startDateString,
            end: date.endDateString,
        });
        props.setSelectedDate(tempSelectedDate);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ alignItems: 'center', marginTop: 30, }}>
                <Text style={{ fontSize: 15, color: 'white', fontWeight: '400', backgroundColor: '#eb022a', borderRadius: 50, padding: 8 }}>
                    Pick a Parking Spot
                </Text>
            </View>
            <View style={{ zIndex: 10 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showDatePicker}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setShowDatePicker(false);
                    }}>
                    <DatePicker
                        isVisible={showDatePicker}
                        mode={'range'}
                        onCancel={() => setShowDatePicker(false)}
                        onConfirm={onConfirm}
                        colorOptions={{
                            headerColor: '#eb022a',
                            selectedDateBackgroundColor: '#eb022a',
                            confirmButtonColor: '#eb022a',
                        }}
                    />
                </Modal>
            </View>
            <View style={{ height: 0 }}>
                <DetailsModal
                    Open={open}
                    setOpen={setOpen}
                    Locked={locked}
                    setLocked={setLocked}
                    SelectedDate={props.SelectedDate}
                    setSelectedDate={props.setSelectedDate}
                    SelectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    ShowDatePicker={showDatePicker}
                    setShowDatePicker={setShowDatePicker}
                />
            </View>
            <TouchableOpacity
                activeOpacity={1}
                style={{ backgroundColor: 'red', marginTop: 100 }}
                onPress={e => {
                    var tempPosition = [];
                    tempPosition.push({
                        locationX: e.nativeEvent.locationX,
                        locationY: e.nativeEvent.locationY,
                    });
                    !locked ? setPosition(tempPosition) : setPosition(position);
                    console.log(
                        'onPress event',
                        e.nativeEvent,
                        'position',
                        position.length,
                    );
                    // console.log('locationX', position[0].locationX);
                }}
                onPressOut={() => {
                    !locked ? setOpen(true) : setOpen(open);
                    console.log('Press ended');
                }}>
                <ImageBackground
                    source={require('../images/parking.jpg')}
                    resizeMode="contain"
                    style={{ width: width, height: height * 0.316 }}
                >
                    <Pressable onPress={() => setIsVisible(true)} style={{ position: "absolute", right: 10, bottom: 10 }}>
                        <IconFromSL name='frame' size={25} color={'black'} />
                    </Pressable>
                </ImageBackground>
                {position.length > 0 ? (
                    <View
                        style={{
                            position: 'absolute',
                            left: position[0].locationX - 2,
                            top: position[0].locationY - 2,
                        }}>
                        <IonIcon
                            onPress={() => setPopup(true)}
                            name="location-sharp"
                            color={locked ? 'red' : 'aquamarine'}
                            size={width * 0.06}
                        />
                        {popup &&
                            locked &&
                            props.SelectedDate.length > 0 &&
                            selectedTime.length > 0 ? (
                            <View
                                style={{
                                    position: 'relative',
                                    width: width * 0.45,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    zIndex: 10,
                                }}>
                                <IonIcon
                                    onPress={() => setPopup(false)}
                                    style={{ position: 'absolute', right: -8, top: -10 }}
                                    name="close-circle"
                                    size={20}
                                    color={'#eb022a'}
                                />
                                <View style={{ margin: 10 }}>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 10,
                                        }}>
                                        <IconFromFA5 name="clock" size={18} color={'#eb022a'} />
                                        <Text style={{ marginLeft: 5, color: 'black', fontSize: 13 }}>
                                            {selectedTime[0].startTime} - {selectedTime[0].endTime}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <IconFromFA5 name="calendar" size={18} color={'#eb022a'} />
                                        <Text style={{ marginLeft: 5, color: 'black', fontSize: 12 }}>
                                            {props.SelectedDate[0].start} - {props.SelectedDate[0].end}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <></>
                        )}
                    </View>
                ) : (
                    <></>
                )}
            </TouchableOpacity>
            <ImageView
                images={[require('../images/parking.jpg')]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
            <View style={{ marginTop: height * 0.08, margin: 10, flexDirection: "row", alignItems: "center", backgroundColor: '#EEEEEE', borderRadius: 10, padding: 10 }}>
                <IconFromEntypo name='info-with-circle' size={15} color={'gray'} />
                <Text style={{ color: 'black', marginLeft: 5 }}>Select a parking spot by tapping on the image directly</Text>
            </View>
        </View>
    );
};

export default ParkingLot;
