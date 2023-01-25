import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { service_account } from "../secrets.js"

// by using default it stops it from destructing 
// when imported
export default function dbConnect() {
    // if getApps() has a length of zero
    if (!getApps().length) {
        // connect
        initializeApp({
            credential: cert(service_account)
        })
    }
    // return db-connection
    return getFirestore()
}   