const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const menuItemData = req.body; // Assuming the request
    //body contains menu item data
    // Create a new menu item using the Mongoose model
    const menuItem = new MenuItem(menuItemData);
    // Save the new menu item to the database
    const menu_data = await menuItem.save();
    console.log("Menu item saved");
    res.status(200).json(menu_data);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Use the Mongoose model to find all menu items in the database
    const menuItems = await MenuItem.find();
    // Send the list of menu items as a JSON response
    console.log("data fetched");
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "Sweet" || tasteType == "Sour" || tasteType == "Spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fethched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
