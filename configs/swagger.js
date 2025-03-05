import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Ventas",
            version: "1.0.0",
            description: "API de ventas en linea",
            contact: {
                name: "Harlin Palacios",
                email: "hapalacios-2020586@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/admin/v1"
            }
        ]
    },
    apis: [
        "./src/auth/*.js",
        ".src/categoria/*.js" ,
        ".src/producto/*.js",
        ".src/user/*.js" 
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi}