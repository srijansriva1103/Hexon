const Cluster = require("../models/Cluster");
const Machine = require("../models/Machine");
const app = require("express");
const router = app.Router();

router.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const { name, region } = req.body;
    const cluster = await Cluster.create({ name, region });

    res.json({ message: "Cluster created successfully", cluster });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const clusterId = req.params.id;
    await Cluster.destroy({
      where: { id: clusterId },
      include: [{ model: Machine }],
    });
    res.json({
      message: "Cluster and associated Machines deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
