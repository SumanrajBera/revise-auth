import { app } from "./src/app";
import { appConfig } from "./src/config/appConfig";
import { connectToDB } from "./src/config/database";

const port = process.env.PORT || appConfig.PORT

async function startServer() {
    try {
        await connectToDB();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Server configuration issue", err);
        process.exit(1);
    }
}

startServer()