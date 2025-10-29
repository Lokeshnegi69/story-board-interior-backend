import ClientCommunity from "../models/ClientCommunity.js";

// GET all client submissions
export const getClientSubmissions = async (_req, res) => {
  try {
    const submissions = await ClientCommunity.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD new client submission
export const addClientSubmission = async (req, res) => {
  try {
    const submission = await ClientCommunity.create(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
