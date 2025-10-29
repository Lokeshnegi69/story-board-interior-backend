import ClientStory from "../models/ClientStory.js";

// GET all client stories
export const getClientStories = async (_req, res) => {
  try {
    const stories = await ClientStory.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD a new client story
export const addClientStory = async (req, res) => {
  try {
    const story = await ClientStory.create(req.body);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
