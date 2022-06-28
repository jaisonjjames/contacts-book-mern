import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    selectedImage: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;