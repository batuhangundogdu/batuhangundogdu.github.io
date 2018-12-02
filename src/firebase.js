import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyAxFHmiOvs-c6aSh0fx5HRkayJjTy5U96M',
  authDomain: 'kolaysiparis-53c7b.firebaseapp.com',
  databaseURL: 'https://kolaysiparis-53c7b.firebaseio.com',
  projectId: 'kolaysiparis-53c7b',
  storageBucket: 'kolaysiparis-53c7b.appspot.com',
  messagingSenderId: '902530422888'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
export const auth = firebaseApp.auth()
