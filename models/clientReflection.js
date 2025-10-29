import mongoose from "mongoose";

const clientReflectionSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },       // main testimonial image
    quoteIcon: { type: String, required: true },   // small quote icon
    quote: { type: String, required: true },       // testimonial text
    clientName: { type: String, required: true }   // client's name
  },
  { timestamps: true }
);

const ClientReflection = mongoose.model("ClientReflection", clientReflectionSchema);
export default ClientReflection;
