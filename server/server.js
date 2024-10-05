const express = require('express');
const cors = require('cors');
const demoController = require('./demoController');
const resultsRoutes = require('./routes/resultsRoutes');
const standingsRoutes = require('./routes/standingsRoutes');
const driversRoutes = require('./routes/driversRoutes');
const constructorsRoutes = require('./routes/constructorsRoutes');


// Load environment variables from .env file
// Ensure your .env file has the required database credentials.
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

const app = express();
const PORT = envVariables.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.json());             // Parse incoming JSON payloads
app.use(cors());  // enable cors in request headers to allow cross-origin HTTP requests

// If you prefer some other file as default page other than 'index.html',
//      you can adjust and use the bellow line of code to
//      route to send 'DEFAULT_FILE_NAME.html' as default for root URL
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/DEFAULT_FILE_NAME.html');
// });


// mount the router
app.use('/demo/', demoController);
app.use('/results/', resultsRoutes);
app.use('/standings/', standingsRoutes);
app.use('/drivers/', driversRoutes);
app.use('/constructors/', constructorsRoutes);




// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

