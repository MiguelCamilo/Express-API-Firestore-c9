import dbConnect from "./dbConnect.js"// import db connection
import { initializeApp, cert, getApps } from "firebase-admin/app"
import { service_account } from "../secrets.js"

const colletionName = 'subway'

initializeApp({
	credential: cert(service_account),
});


const pizza_Hawaiian = {
    type: "Hawaiian",
    ingredients: "pineapple , tomato , cheese , ham",
    addons: "black pepper , parmesan cheese",
    size: "large",
    price: 13.99,
    togo: false
};


//! GET
export const getAllRestaurants = async (req,res) => {
    const db = dbConnect()
    // query to get all data 
    const collection = await db.collection(colletionName).get()

    const restaurants =  collection.docs.map( (element) => {
        let food = element.data()
        food.id = element.id
        return food
    })
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

//! CREATE
export const createResturant = async (req,res) => {
    const db = dbConnect()

    // req.body means it the request that is coming will have a body
    await db.collection(colletionName).add(pizza_Hawaiian)
    res.status(201).send('Added Restaurant')
}

//! UPDATE
// export const updateRestaurant = async (req,res) => {
//     const { restId } = req.params
//     const updateInfo = req.body

//     const db = dbConnect()

//     await db.collection(colletionName).doc(restId).update(updateInfo)
//     res.status(202).send('Restaurant Updated')
// }

//! DELETE

// export const deleteRestaurant = async (req,res) => {
//     const { restId } = req.params
    
//     const db = dbConnect()
//     await db.collection(colletionName).doc(restId).delete()
//     res.send("Restaurant Deleted")
// }