const Machine = require("../models/Machine");
const Clusters = require("../models/Cluster");
const Tag = require("../models/Tag");
const app = require("express");
const router = app.Router();

router.post("/create", async (req, res) => {
  try {
    const { clusterId, name, ipAddress, instanceType, tags } = req.body;
    const foundCluster = await Clusters.findByPk(clusterId, {
      include: [{ model: Machine }],
    });
    if (!foundCluster) {
      res.status(404).json({ message: "Cluster doesn't exists" });
    }

    if (tags && tags.length > 0) {
      const machine = await Machine.create({
        name,
        ipAddress,
        instanceType,
        ClusterId: clusterId,
      });
      const tagsToAdd = await Tag.bulkCreate(
        tags.map((tag) => ({ name: tag }))
      );
      await machine.addTags(tagsToAdd);
      res.json(machine);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/action", async (req, res) => {
  console.log("OKO", req.body);
  try {
    const machines = await Machine.findAll({
      include: [
        {
          model: Tag,
          where: { name: req.body.tag },
        },
      ],
    });
    if (machines.length === 0) {
      res.status(404).json({ message: "No Machine found" });
    }
    for (const machine of machines) {
      // Perform actions based on the 'action' parameter
      switch (req.body.action) {
        case "start":
          // Logic for starting the machine
          console.log(`Starting machine ${machine.name}`);
          break;
        case "stop":
          // Logic for stopping the machine
          console.log(`Stopping machine ${machine.name}`);
          break;
        case "reboot":
          // Logic for rebooting the machine
          console.log(`Rebooting machine ${machine.name}`);
          break;
        default:
          // Invalid action
          return res.status(400).json({ error: "Invalid action" });
      }
    }

    res.json({
      message: `${req.body.action} action performed on machines with tag: ${req.body.tag}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const machineId = req.params.machineId;
    await Machine.destroy({ where: { id: machineId } });

    res.json({ message: "Machine deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
