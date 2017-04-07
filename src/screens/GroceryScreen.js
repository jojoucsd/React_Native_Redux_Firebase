'use strict'
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, AlertIOS, Navigator, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from '../components/common';
import firebaseApp from '../firebase/config';
import styles from '../styles';
import ActionButton from '../components/ActionButton'
import StatusBar from '../components/StatusBar'
// import ListItem from '../components/ListItem'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser, setMobile, listenMobile, updateMobile, listenItems, addItem, removeItem, searchMobile } from '../action/userActions'
import { logoutUser} from '../action/firebaseAuth'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class GroceryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }

        // this.itemsRef = this.getRef().child('items');
        this.saveMobile = this.saveMobile.bind(this);
    };

    async componentDidMount() {
        try {
            //Get User Info

            await this.props.getCurrentUser();

            this.props.listenMobile(this.props.uid)

            this.props.listenItems(this.props.uid)

        } catch (error) {
            console.log("do we have error", error)
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log("this.props", this.props)
        console.log("nextProps", nextProps)

        if (!this.arraysEqual(this.props.items, nextProps.items)) {
            console.log("UPDATE STATE HERE")

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
            })
        }
    }

    saveMobile(number) {

        //Set Mobile
        if (this.props.mobile != number) {
            this.props.updateMobile(this.props.uid, number)
        } else if (this.props.mobile == "") {
            this.props.mobileForm = number
            this.props.setMobile(this.props.uid, number)
        }
        console.log('Input and Database is the Same')
    }

    render() {
        console.log('Props in Grocery', this.props.items)
        return (
            <View>
                <StatusBar title={this.props.email} style={{backgroundColor: 'pink'}} />
                <Text style={styles.heading}> UserID: {this.props.uid}</Text>
                <Text style={styles.heading}> Mobile Number(From DB): {this.props.mobile}</Text>

                {/*<ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview} />*/}

                <SwipeListView
                    dataSource={this.state.dataSource}
                    renderRow={(data, secId, rowId, rowMap) => {
                        console.log("DATA OBJECT", data)
                        return (
                            <SwipeRow
                                disableLeftSwipe={false}
                                leftOpenValue={ 150}
                                rightOpenValue={-150}
                            >
                                <View style={style.rowBack}>
                                    <TouchableOpacity style={[style.backLeftBtn, style.backLeftBtnLeft]}>
                                        <Text style={style.backTextWhite}>Claim</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[style.backLeftBtn, style.backLeftBtnRight]}>
                                        <Text style={style.backTextWhite}>Total</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[style.backRightBtn, style.backRightBtnLeft]}>
                                        <Text style={style.backTextWhite}>Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[style.backRightBtn, style.backRightBtnRight]} onPress={_ => this.props.removeItem(this.props.uid, data._key)}>
                                        <Text style={style.backTextWhite}>Complete</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableHighlight
                                    onPress={_ => console.log('You touched me')}
                                    style={style.rowFront}
                                    underlayColor={'#AAA'}
                                >
                                    <View>
                                        <Text> {data.title} </Text>
                                    </View>
                                </TouchableHighlight>
                            </SwipeRow>
                        )
                    }}
                    enableEmptySections={true}
                />

                <ActionButton title="Add" onPress={this._addItem.bind(this)} />
                <ActionButton title="Mobile" onPress={this._addMobile.bind(this)} />
            </View>
        )
    }

    _addMobile() {
        AlertIOS.prompt(
            'Add Mobile Number',
            null,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Add Mobile'), style: 'cancel' },
                {
                    text: 'Mobile',
                    onPress: (number) => {
                        this.saveMobile(number)
                    }
                }
            ],
            'plain-text'
        );
    }

    _addItem() {
        AlertIOS.prompt(
            'Add New Item',
            null,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Add',
                    onPress: (text) => {
                        this.props.addItem(this.props.uid, text)
                    }
                },
            ],
            'plain-text'
        );
    }

    /*_renderItem(item) {
        console.log('renderItem')
        const onPress = () => {
            AlertIOS.alert(
                'Complete',
                null,
                [
                    {
                        text: 'Complete',
                        onPress: (text) => this.props.removeItem(this.props.uid, item._key)
                    },
                    { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
                ]
            );
        }
        return (
            <ListItem item={item}
                onPress={onPress}
                removable={this.props}
                onRemove={() => this.props.removeItem(this.props.uid, item._key)} />
        )
    }*/

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}

const style = StyleSheet.create({

    backTextWhite: {
        color: '#FFF'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backLeftBtn:{
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backLeftBtnLeft:{
        backgroundColor: 'pink',
        left: 75
    },
    backLeftBtnRight:{
        backgroundColor: 'green',
        left: 0
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
});

function mapStateToProps(state) {
    console.log('grocery state', state.user)
    // console.log('auth', state.auth)

    const { mobile, email, items } = state.user
    return {
        mobile,
        email,
        items
    }
}

export default connect(mapStateToProps, { logoutUser ,setMobile, listenMobile, updateMobile, getCurrentUser, listenItems, addItem, removeItem, searchMobile })(GroceryScreen)