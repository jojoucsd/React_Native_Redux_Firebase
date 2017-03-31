import firebase from 'firebase';

import {
    USER_SET_MOBILE,
    USER_UPDATE_MOBILE,
    USER_LISTEN_MOBILE,
    GET_CURRENTUSER,
    LISTEN_ITEMS,
} from './types'

export const getCurrentUser = () => dispatch => {

    let cUser = firebase.auth().currentUser;
    // console.log('action', cUser)
    dispatch({
        type: GET_CURRENTUSER,
        uid: cUser.uid,
        email: cUser.email
    })

}

export const setMobile = (userId, mobile) => dispatch => {
    let userMobilePath = "/user/" + userId;
    firebase.database().ref(userMobilePath).set({
        mobile: mobile
    })
    dispatch({
        type: USER_SET_MOBILE,
        mobile: mobile
    })
}

export const updateMobile = (userId, mobile) => dispatch => {
    let userMobilePath = "/user/" + userId;
    firebase.database().ref(userMobilePath).update({
        mobile: mobile
    })
    dispatch({
        type: USER_UPDATE_MOBILE,
        mobile: mobile
    })
}

export const listenMobile = (userId) => dispatch => {
    let userMobilePath = "/user/" + userId;

    firebase.database().ref(userMobilePath).on('value', (snapshot) => {
        var mobile = "";

        if (snapshot.val()) {
            mobile = snapshot.val().mobile
        }
        dispatch({
            type: USER_LISTEN_MOBILE,
            mobile: mobile
        })
    })
}

export const listenItems = (userId) => dispatch => {
    //console.log('are we in here')
    let userItemPath = "/user/" + userId;
    firebase.database().ref(userItemPath).child('items').on('value', (snap) => {
        var items = [];
        snap.forEach((child) => {
            items.push({
                title: child.val().title,
                _key: child.key
            })
        })
        console.log("called")
        dispatch({
            type: LISTEN_ITEMS,
            userItems: items
        })
    })
}

export const addItem = (userId, item) => dispatch => {
    let userItemPath = "/user/" + userId;
    firebase.database().ref(userItemPath).child('items').push({ title: item })
}

export const removeItem = (userId, item_key) => dispatch => {
    let userItemPath = "/user/" + userId;
    firebase.database().ref(userItemPath).child('items').child(item_key).remove()
}

export const searchMobile = (mobile) => dispatch => {
    firebase.database().ref("/user/").orderByKey().endAt(mobile).on('child_added', function(snapshot) {
            console.log('search return', snapshot.key)
        })
}

