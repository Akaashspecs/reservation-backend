const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create Booking
router.post("/create", async (req, res) => {
  try {
    const { name, contact, date, time, guests } = req.body;

    // Check for existing booking (prevent double bookings)
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(201).json({ message: "Time slot already booked." });
    }

    const booking = new Booking({ name, contact, date, time, guests });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete Booking
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
