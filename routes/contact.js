const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Create Contact
router.post("/create", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully!", contact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get Contact
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// // Delete Booking
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Booking.findByIdAndDelete(id);
//     res.status(200).json({ message: "Booking deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

module.exports = router;
