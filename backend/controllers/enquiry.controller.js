import Enquiry from "../models/enquiry.models.js";

export const submitEnquiry = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newEnquiry = new Enquiry({
            name,
            email,
            message
        });
        await newEnquiry.save();
        res.status(200).json({ message: 'Enquiry submitted successfully' });
    } catch (error) {
        console.error('Enquiry submission error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}