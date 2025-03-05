"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import cateRoutes from "../src/categoria/cate.routes.js"
import producRoutes from "../src/producto/producto.routes.js"
import { createAdmin } from "../src/user/user.controller.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use("/admin/v1/auth", authRoutes)
    app.use("/admin/v1/user", userRoutes)
    app.use("/admin/v1/categoria", cateRoutes)
    app.use("/admin/v1/producto", producRoutes)
}

const conectarDB = async () => {
    try{
        await dbConnection()
        await createAdmin()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}

