import { View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Entypo';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const LandingScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "white" }}>
            <Image
                source={require('../images/PBLogo.png')}
                resizeMode="contain"
                style={{ width: width * 0.8, marginTop: height * 0.3, }}
            />
            <Button
                title="Book a parking"
                color="#eb022a"
                trailing={props => <Icon name="location" color={'white'} {...props} />}
                onPress={() => {
                    navigation.navigate('Home')
                }}
            />
        </View>
    )
}

export default LandingScreen