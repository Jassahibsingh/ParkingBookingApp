import { View, Text, useWindowDimensions, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import ParkingLot from './ParkingLot';
import Bookings from './Bookings';
import DatePicker from 'react-native-neat-date-picker';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const currentDate = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`;

const HomeScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Parking', title: 'Parking' },
        { key: 'Bookings', title: 'Bookings' },
    ]);
    const [selectedDateFilter, setSelectedDateFilter] = useState(`${currentDate}`);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState([]);


    const onConfirm = date => {
        setShowDatePicker(false);
        console.log(date, '---', selectedDateFilter);
        setSelectedDateFilter(date.dateString);
    };

    const renderTabBar = props => {
        return (
            <View>
                <TabBar
                    {...props}
                    // scrollEnabled={true}
                    renderLabel={({ route, focused, color }) => (
                        <Text
                            style={{
                                marginVertical: 10,
                                paddingRight: 12,
                                paddingLeft: 12,
                                paddingTop: 10,
                                paddingBottom: 8,
                                borderRadius: 100,
                                fontSize: 14,
                                backgroundColor: focused ? '#eb022a' : 'white',
                                color: focused ? 'white' : '#505053',
                                borderWidth: focused ? 0 : 1,
                                borderColor: '#9a9a9a',
                                fontWeight: '600',
                            }}>
                            {route.title}
                        </Text>
                    )}
                    indicatorStyle={{ backgroundColor: 'transparent' }}
                    style={{}}
                    contentContainerStyle={{ backgroundColor: 'white' }}
                    tabStyle={{ width: width * 0.3, }}
                    pressColor={'white'}
                    pressOpacity={0}
                />
            </View>
        );
    };

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'Parking':
                return <ParkingLot SelectedDate={selectedDate} setSelectedDate={setSelectedDate} jumpTo={jumpTo} />;
            case 'Bookings':
                return (
                    <Bookings
                        SelectedDate={selectedDate}
                        SelectedDateFilter={selectedDateFilter}
                        setSelectedDateFilter={setSelectedDateFilter}
                        setShowDatePicker={setShowDatePicker}
                        jumpTo={jumpTo}
                    />
                );
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
            <Image
                source={require('../images/PBLogo.png')}
                resizeMode="contain"
                style={{ position: "absolute", top: -95, right: 10, width: width * 0.25, height: height * 0.316 }}
            />
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                onCancel={() => setShowDatePicker(false)}
                onConfirm={onConfirm}
                colorOptions={{
                    headerColor: 'red',
                    selectedDateBackgroundColor: 'red',
                    confirmButtonColor: 'red',
                }}
            />
        </View>
    );
};

export default HomeScreen;
