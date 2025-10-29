import mongoose from "mongoose";

const signatureProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // project cover image
  link: { type: String }, // optional: case study / project details page
});

const SignatureProject = mongoose.model("SignatureProject", signatureProjectSchema);

export default SignatureProject;
