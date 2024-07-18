/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const mainRouter = require("./routes/api.router");
const authRouter = require("./routes/auth.api.router");
const addSock = require("./routes/api.add.sock");
const addSockToBasket = require("./routes/api.addSockToBasket.router");
const allSocks = require("./routes/api.allSocks");
const basketSock = require("./routes/api.basketSock.router");
const oneSockById = require("./routes/api.oneSockById.router");
const userSocks = require("./routes/api.userSocks.router");
const favoritesRouter = require('./routes/favorites.api.router');
const deleteSockByBasket = require('./routes/api.daleteSockByBasket.router');
const updateSockQuantity = require("./routes/api.update.quantity")

const app = express();
const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors(corsConfig));

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/", addSock);
app.use("/", addSockToBasket);
app.use("/", allSocks);
app.use("/", basketSock);
app.use("/", oneSockById);
app.use("/", userSocks);
app.use('/', favoritesRouter);
app.use("/", deleteSockByBasket);
app.use("/", updateSockQuantity)

module.exports = app;
