import { View, Text, Dimensions, Pressable, Image, ScrollView } from 'react-native';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-neat-date-picker';
import IconFromFA5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList } from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Bookings = props => {
    const total = 21;
    var count = 1;
    const [booked, setBooked] = useState(1);
    const [available, setAvailable] = useState();

    const data = [
        {
            sno: 1,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 2,
            isBookedOn: '2023-04-09'
        },
        {
            sno: 3,
            isBookedOn: '2023-04-07'
        },
        {
            sno: 4,
            isBookedOn: '2023-04-08'
        },
        {
            sno: 5,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 6,
            isBookedOn: '2023-04-07'
        },
        {
            sno: 7,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 8,
            isBookedOn: '2023-04-08'
        },
        {
            sno: 9,
            isBookedOn: '2023-04-07'
        },
        {
            sno: 10,
            isBookedOn: '2023-04-07'
        },
        {
            sno: 11,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 12,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 13,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 14,
            isBookedOn: '2023-04-07'
        },
        {
            sno: 15,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 16,
            isBookedOn: '2023-04-07'
        },
        {
            sno: 17,
            isBookedOn: '2023-04-08'
        },
        {
            sno: 18,
            isBookedOn: '2023-04-07'
        },
        {
            sno: 19,
            isBookedOn: '2023-04-08'
        },
        {
            sno: 20,
            isBookedOn: '2023-04-06'
        },
        {
            sno: 21,
            isBookedOn: '2023-04-07'
        },
    ]
    useEffect(() => {
        setAvailable(total - booked);
    }, [booked])
    const renderItem = ({ item, index }) => {
        console.log("props-----", props, "istrue", item.isBookedOn === props.SelectedDateFilter);
        return (
            <View style={{ padding: 5, height: height * 0.08, width: width * 0.25, backgroundColor: '#EEEEEE', margin: 15 }}>
                <Text style={{ color: '#eb022a', fontSize: 15, }}>
                    {item.sno}
                </Text>
                {item.isBookedOn === props.SelectedDateFilter ? <>
                    <Image source={require('../images/car.png')} />
                    {setBooked(count++)}
                </>
                    :
                    <></>
                }
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', height: height }}>
            <View style={{ flexDirection: 'row' }}>
                <Pressable>
                    <Text
                        style={{
                            marginVertical: 10,
                            paddingRight: 15,
                            paddingLeft: 15,
                            paddingTop: 10,
                            paddingBottom: 8,
                            borderRadius: 100,
                            fontSize: 14,
                            backgroundColor: '#cccccc',
                            color: 'black',
                            borderColor: '#9a9a9a',
                            fontWeight: '600',
                            marginLeft: 5
                        }}>
                        Available : {available}
                    </Text>
                </Pressable>
                <Pressable>
                    <Text
                        style={{
                            marginVertical: 10,
                            paddingRight: 15,
                            paddingLeft: 15,
                            paddingTop: 10,
                            paddingBottom: 8,
                            borderRadius: 100,
                            fontSize: 14,
                            backgroundColor: 'lightgray',
                            color: 'black',
                            borderColor: '#9a9a9a',
                            fontWeight: '600',
                            marginLeft: 8
                        }}>
                        Booked : {booked}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => props.setShowDatePicker(true)}
                    style={{
                        marginVertical: 10,
                        paddingRight: 15,
                        paddingLeft: 15,
                        paddingTop: 10,
                        paddingBottom: 8,
                        borderRadius: 100,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: 'pink',
                        marginLeft: 8
                    }}
                >
                    <IconFromFA5 name="calendar" size={18} color={'#eb022a'} />
                    <Text style={{
                        fontSize: 14,
                        color: 'black',
                        fontWeight: '600',
                        marginHorizontal: 10
                    }}>`{props.SelectedDateFilter}`</Text>
                </Pressable>
            </View>

            <ScrollView>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </ScrollView>
        </View>
    );
};

export default Bookings;
