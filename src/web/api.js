/**
 * API Server Initialization
 *
 * @param {Object} client - The client object
 */
module.exports = async (client) => {
  const User = client.User;
  const argon2 = require('argon2');
  const webport = client.config.webport;
  
  const app = require('./app.js')(client);
  client.logger.info('API endpoints loaded');
  
  // Start the server
  app.listen(webport, () => {
      client.logger.info(`Server running at http://localhost:` + webport);
  });
  
  // Root route
  app.get('/', (req, res) => {
      console.log('Hi');
      res.send('Hello World!');
  });
  
  // Login route
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user with the provided username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Verify the password using argon2
      const passwordMatch = await argon2.verify(user.password, password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Register route
  app.post('/api/register', async (req,res) => {
    const { username, password } = req.body;
  
    try {
      // Hash the password using argon2
      const hashedPassword = await argon2.hash(password);
  
      // Create a new user with the hashed password
      const newUser = new User({ username, password: hashedPassword });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Retrieve users route
  app.get('/api/users', (req, res) => {
      User.find()
        .then((users) => {
          console.log('Users found');
          res.status(200).json(users);
        })
        .catch((err) => {
          res.status(400).json({ message: 'Failed to retrieve users' });
        });
  });
}