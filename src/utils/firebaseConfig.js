import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyANpZzR5EFhgWC_gTZ4pDylyJ-fKTVBT4A',
  authDomain: 'birdy-c59df.firebaseapp.com',
  databaseURL: 'https://birdy-c59df-default-rtdb.firebaseio.com',
  projectId: 'birdy-c59df',
  storageBucket: 'birdy-c59df.appspot.com',
  messagingSenderId: '805291793939',
  appId: '1:805291793939:web:8d77836a090b96fc2169e6',
}
firebase.initializeApp(firebaseConfig)
export default firebase
