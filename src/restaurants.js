import dbConnect from "./dbConnect.js"// import db connection
import { FieldValue } from "firebase-admin/firestore" 

const colletionName = 'restaurants'

//! CREATE
export const createResturant = async (req,res) => {
    const db = dbConnect()
    // req.body means it the request that is coming will have a body
    let newRestaurant = req.body

    // this is adding a value to newRestaurant object
    newRestaurant.createdAt = FieldValue.serverTimestamp() // then add a timestamp to the new restaurant

    await db.collection(colletionName).add(newRestaurant)
    res.status(201).send('Added Restaurant')
}


//! GET DOC DATA
export const getAllRestaurants = async (req,res) => {
    const db = dbConnect()
    // query to get all data 
    // .orderBy() says to order by the timestamp above in descending order
    const collection = await db.collection(colletionName).orderBy('createdAt', 'desc').get()

    // maps the data and returns it                                            // this adds value id
    const restaurants =  collection.docs.map( element =>  ({...element.data(), restId: element.id}))

    console.table(restaurants)
    res.send(restaurants)
}

//! GET DOC ID
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

//! UPDATE
//TODO: 
export const updateRestaurant = async (req,res) => {
    const { restId } = req.params
    const updateInfo = req.body

    const db = dbConnect()
    
    // added an update timestamp when data is manipulated
    updateInfo.updateAt = FieldValue.serverTimestamp()

    await db.collection(colletionName).doc(restId).update(updateInfo)
    res.status(202).send('Restaurant Updated')
}

//! DELETE
export const deleteRestaurant = async (req,res) => {
    const { restId } = req.params
    
    const db = dbConnect()
    await db.collection(colletionName).doc(restId).delete()
    res.send("Restaurant Deleted")
}