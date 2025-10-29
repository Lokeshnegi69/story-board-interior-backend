import InstagramPost from "../models/InstagramPost.js";

// GET all Instagram posts
export const getInstagramPosts = async (req, res) => {
  try {
    const posts = await InstagramPost.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("getInstagramPosts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const createInstagramPost = async (req, res) => {
  try {
    if (!req.files?.image) {
      return res.status(400).json({ message: "Post image is required" });
    }

    const imageUrl = req.files.image[0].path; // Cloudinary URL
    const overlayIconUrl = req.files?.overlayIcon ? req.files.overlayIcon[0].path : undefined;

    const post = await InstagramPost.create({
      image: imageUrl,
      overlayIcon: overlayIconUrl,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("createInstagramPost error:", err);
    res.status(500).json({ message: "Failed to create Instagram post", error: err.message });
  }
};
