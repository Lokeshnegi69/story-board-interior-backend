import Subscriber from "../models/Subscriber.js";

// POST new subscriber
export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if already exists
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    const newSubscriber = await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed successfully", subscriber: newSubscriber });
  } catch (err) {
    console.error("addSubscriber error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
