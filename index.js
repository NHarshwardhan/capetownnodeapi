const express = require('express');
const requestRoute = require('./routes/requestRoute');
const donateRoute = require('./routes/donateRoute');

const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())


app.use('/api', requestRoute);
app.use('/api', donateRoute);

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
