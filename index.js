import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import { getAllRestaurants, getRestaurantById, createResturant } from "./src/restaurants.js"

const app = express()
const port = process.env.PORT || 3030 // best practice just incase dotenv is not connected
app.use(cors())
app.use(express.json()) // only looks for json files

// set up routes
// get all restaurants from db
app.get('/restaurants', getAllRestaurants)

// get a specific restaurants
app.get('/restaurants/:restId', getRestaurantById)
app.post('/restaurants', createResturant)

app.listen(port, () => {
    console.log(`Server is listening on port...${port}`)
})