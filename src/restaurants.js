import dbConnect from "./src/dbConnect.js" // import db connection

export const getAllRestaurants = (req,res) => {
    const db = dbConnect()
    res.send('All Restaurants')
}

export const getRestaurantById = (req,res) => {
    const db = dbConnect()

    // using destructuring to pull restId
    // from the object req.params
    const { restId  } = req.params
    res.send(`Got Restaurant: ${restId}`)
}

export const createResturant = (req,res) => {
    const db = dbConnect()

    // req.body means it the request that is coming will have a body
    const newRestaurant = req.body 
    res.status(201).send('Added Restaurant')
}