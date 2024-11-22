import "dotenv/config"
import expressApp from "./expressApp.js"


// Set the server port from environment variables or to a default if not found.
const PORT = Number(process.env.PORT) || 5025;

// Start the application by setting Express to listen for incoming API calls!
expressApp.listen(PORT, () => {
    // TODO: Consider improved logging here.
    console.log(`Server is running on http://localhost:${PORT}`);
});