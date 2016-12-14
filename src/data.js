const firebase = window.firebase

// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
};

firebase.initializeApp(config);

function Data(authcb) {
  const database = firebase.database()

  this.getRef = ({fbref, parentRef}) => {
    if (parentRef) return `${parentRef}/${fbref}`
    else return `data/${this.user.uid}/${fbref}`
  }

  this.setListener = ({ref, callback}) => {
    firebase.database().ref(ref).on('value', (snapshot) =>{
      const data = snapshot.val()
      callback(data)
    })

    const cancelListener = () => firebase.database().ref(ref).off()
    return cancelListener
  }

  const updateData = (user) => {
    'auth changed'
    if (user) this.user = user
    else this.user = null
    authcb(user)
  }

  const handleError = (error) => console.log(error)

  firebase.auth().onAuthStateChanged(updateData.bind(this), handleError)

  return this
}

export default Data

