// rubatagabot/Bot/db.js

const firebase = require('firebase-admin');
//const config = require("./config/db_config");
const CONFIGKEY = process.env.CONFIGKEY ? process.env.CONFIGKEY : require('./config/db_config').private_key;
const CONFIGEMAIL = process.env.CONFIGEMAIL ? process.env.CONFIGEMAIL : require('./config/db_config').client_email;
//const CONFIGPROJID = process.env.CONFIGPROJID ? process.env.CONFIGPROJID : require('./config/db_config').project_id;

firebase.initializeApp({
    credential: firebase.credential.cert({
        //"project_id" : CONFIGPROJID,
        "private_key" : CONFIGKEY.replace(/\\n/g, '\n'),
        "client_email": CONFIGEMAIL,
    }),
    databaseURL: 'https://rubatagabot.firebaseio.com'
});
let database = firebase.database();

const following = (param = '') => database.ref(`following/${param}`);

const commented = (param = '') => database.ref(`commented/${param}`);

const followHistory = (param = '') => database.ref(`follow_history/${param}`);

let addFollowing = async username =>{
    const added = new Date();
    return following(username).set({username,added});
};

let addCommented = async postID =>{
    const commentDate = new Date();
    return commented(postID).set({postID,commentDate});
};

let getFollowings = async () => following().once('value').then(data => data.val());

let unFollow = async username => following(username).remove().then(() => followHistory(username).set({username}));

let inHistory = async username => followHistory(username).once('value').then(data => data.val());

let hasCommented = async postID => commented(postID).once('value').then(data => data.val());

module.exports = {
    addFollowing,
    getFollowings,
    unFollow,
    inHistory,
    addCommented,
    hasCommented,
};