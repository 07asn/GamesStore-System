const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    // Extract only the expected fields from the request body.
    const { full_name, email, subject, message } = req.body;

    // Create a new contact record.
    const newContact = await Contact.create({ full_name, email, subject, message });

    return res.status(201).json({
      message: 'Contact message created successfully',
      data: newContact
    });
  } catch (error) {
    console.error('Error in createContact:', error);
    return res.status(500).json({
      message: error.message || 'Failed to create contact message'
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
