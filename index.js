const express = require("express");
const Machine = require("./models/Machine");
const Tag = require("./models/Tag");
const Cluster = require("./models/Cluster");
const sequelize = require("./config");
const ClusterRoutes = require("./routes/clusterRouter");
const MachineRoutes = require("./routes/machineRouter");

Machine.belongsToMany(Tag, { through: "MachineTag" });
Tag.belongsToMany(Machine, { through: "MachineTag" });

Cluster.hasMany(Machine);
Machine.belongsTo(Cluster);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database and tables created!");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use("/clusters", ClusterRoutes);
app.use("/machine", MachineRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
