// controllers/contactController.js
import Contact , {Studio} from "../models/Contact.js";



export const getStudios = async (req, res) => {
  try {
    const studios = await Studio.find();
    res.status(200).json(studios);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const addStudio = async (req, res) => {
  try {
    

    const { name, imageUrl, location } = req.body;

    if (!name || !imageUrl || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newStudio = new Studio({ name, imageUrl, location });
    await newStudio.save();

    res.status(201).json({ message: 'Studio added successfully', studio: newStudio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, projectLocation, projectType, message } = req.body;

    const contact = new Contact({
      fullName,
      email,
      phone,
      projectLocation,
      projectType,
      message,
      fileUrl: req.file?.path || null,
    });//req.file ? `/uploads/${req.file.filename}` : null,

    await contact.save();
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all enquiries (Admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
