const express = require("express");
const mongodb = require("./config/mongodb");

const app = express();

//CONNECT DATABASE
mongodb();

//INIT MIDDLEWARE
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// DEFINE ROUTERS

app.use("/api/users", require("./routes/users"));
app.use("/api/profile", require("./routes/profile"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
