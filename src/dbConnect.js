import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getFireStore } from "firebase-admin/firestore"
//TODO: import service account from secrets.js

// by using default it stops it from destructing 
// when imported
export default dbConnect = () => {
    // check if NOT connected
    if (!getApps()) {
        // connect
        initializeApp({
            credential: cert(service_account)
        })
    }
    // return db-connection
    return getFireStore()
}   