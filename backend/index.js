const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT=4000 || process.env.PORT;

dotenv.config();
app.use(cors({
    origin: '*',
  }));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

connectDB();

app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' });
    }
);

app.listen(PORT, () => {
    console.log('Server listening on port 4000');
    }
);