import * as firebase from 'firebase';



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCqAmPcwV7h9h2yGLEJrPpT-UUVn-GTChA",
    authDomain: "fantasy-clinic.firebaseapp.com",
    databaseURL: "https://fantasy-clinic.firebaseio.com",
    projectId: "fantasy-clinic",
    storageBucket: "fantasy-clinic.appspot.com",
    messagingSenderId: "1011134547778",
    appId: "1:1011134547778:web:86c14422d73bb669dc6adb"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default }






//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID


















// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// })

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key,snapshot.val());

// })

// // expenses.map((expense) => {
// //     database.ref('expenses').push({
// //         description: expense.description,
// //         note: expense.note,
// //         amount: expense.amount,
// //         createdAt: expense.createdAt
// //     })
// // })

// // console.log(expenses)
// // database.ref().set({
// //     name: 'Andrew Mead',
// //     age: 26,
// //     stressLevel: 6,
// //     job: {
// //         title: "Software Developer",
// //         company: "Amazon"
// //     },
// //     location: {
// //         city: 'Philadelphia',
// //         country: 'United States'
// //     }
// // }).then(() =>
// //     console.log('Data is saved')
// // ).catch((e) =>
// //     console.log('This failed', e)
// // )

// // database.ref().on('value',(snapshot)=>{
// //     const val = snapshot.val()
// //     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);

// // })


// // database.ref().update({
// //     stressLevel: 9,
// //     "job/company": "Amazon",
// //     "location/city": "Seattle"
// // }).then(() =>
// //     console.log('Attributes added')
// // ).catch((e) =>
// //     console.log('This failed', e)
// // )
