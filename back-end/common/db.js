const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    // 'mongodb+srv://my-movies:studying@my-movies.x13pl.mongodb.net/?retryWrites=true&w=majority',
    'mongodb+srv://Studying:Studying12.@cluster0.j7xst7b.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
  );
}

module.exports = connectDB;