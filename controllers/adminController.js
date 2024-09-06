// Admin dashboard access
const getDashboard = (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard!' });
  };

export default {getDashboard};