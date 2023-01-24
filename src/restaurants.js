import dbConnect from "./dbConnect.js"// import db connection
import { initializeApp, cert, getApps } from "firebase-admin/app"
import { service_account } from "../secrets.js"

const colletionName = 'restaurants'

initializeApp({
	credential: cert(service_account),
});

//! GET
export const getAllRestaurants = async (req,res) => {
    const db = dbConnect()
    // query to get all data 
    const collection = db.collection(colletionName).get()
    const restaurants = (await collection).docs.map( (element) => {
        return rest = element.data()
    })

    res.send(restaurants)
}

//! GET DOC
export const getRestaurantById = async (req,res) => {
    const db = dbConnect()
    // using destructuring to pull restId
    // from the object req.params
    const { restId  } = req.params
    // compare to first firestore file
    const doc = db.colletion(colletionName).doc(restId).get()
    const rest = doc.data()

    res.send(`Got Restaurant: ${rest}`)
}

//! CREATE
export const createResturant = async (req,res) => {
    const db = dbConnect()

    // req.body means it the request that is coming will have a body
    const newRestaurant = req.body 
    await db.collection(colletionName).add(newRestaurant)
    res.status(201).send('Added Restaurant')
}

//! UPDATE
export const updateRestaurant = async (req,res) => {
    const { restId } = req.params
    const updateInfo = req.body

    const db = dbConnect()

    await db.collection(colletionName).doc(restId).update(updateInfo)
    res.status(202).send('Restaurant Updated')
}

//! DELETE

// export const deleteRestaurant = async (req,res) => {
//     const { restId } = req.params
    
//     const db = dbConnect()
//     await db.collection(colletionName).doc(restId).delete()
//     res.send("Restaurant Deleted")
// }