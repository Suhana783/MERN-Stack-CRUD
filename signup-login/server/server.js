require('dotenv').config();
const app = require('./src/app.js');
const PORT = process.env.PORT || 5000;
const startServer = async () => {

try {

    app.listen(PORT, () => {
        console.log(`Server is running successfully on http://localhost:${PORT}`)
    });
} catch (error) {
    console.log(`Failed to start the server`, error.message);
}
};
startServer ()