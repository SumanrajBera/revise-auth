import { app } from "./src/app";
import { appConfig } from "./src/config/appConfig";
import { conntectToDB } from "./src/config/database";

const port = process.env.port || appConfig.PORT

try {
    conntectToDB()
    app.listen(port, () => {
        console.log("Server is running...")
    })
} catch (err) {
    throw new Error("Server configuration issue")
}