const app = require('./app');
require('dotenv').config();

const { PORT } = process.env || 3000;

app.listen(PORT, () => console.log(`Server's running on ${PORT}'`));