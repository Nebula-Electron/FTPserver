/**
 * Add Subdomain
 *
 * @param {Object} client - The client object
 * @param {String} username - Username to add subdomain for
 * @returns {Promise} - A promise that resolves with a success message
 */
module.exports = async (client, username) => {
    client.logger.info('Function addSub called');
    const food = ["apple", "banana", "orange", "grapefruit", "strawberry", "blueberry", "raspberry", "blackberry", "cherry", "kiwi", "pineapple", "mango", "watermelon", "cantelope", "honeydew", "pear", "peach", "plum", "apricot", "lemon", "lime", "grape", "raisin", "fig", "avocado", "pomegranate", "coconut", "pepper", "tomato", "cucumber", "zucchini", "eggplant", "carrot", "broccoli", "cauliflower", "spinach", "lettuce", "kale", "cabbage", "bellpepper", "potato", "onion", "garlic", "ginger", "celery", "asparagus", "radish", "beet", "sweetpotato", "butternutsquash", "acornsquash", "pumpkin", "greenbean", "peas", "corn", "artichoke", "leek", "parsnip", "rhubarb", "cantaloupe", "starfruit", "papaya", "jackfruit", "passionfruit", "guava", "plantain", "okra", "watercress", "endive", "arugula", "turnip", "celeryroot", "rutabaga", "fennel", "chard", "bokchoy", "daikon", "mushroom", "beetroot", "kohlrabi", "parsleyroot", "yam", "chestnut", "quince", "persimmon", "elderberry", "cranberry", "gooseberry", "blackcurrant"];
    const Subdomain = require('./schemes/subdomain.js');
    const User = require('./schemes/user');

    /**
     * Create a unique food combination
     * 
     * @returns {Promise} - A promise that resolves with a unique food combination
     */
    async function createFood() {
        const food1 = food[Math.floor(Math.random() * food.length)];
        const food2 = food[Math.floor(Math.random() * food.length)];
        return food1 + food2;
      }
      
      /**
       * Check if the subdomain already exists in the database
       * 
       * @param {String} subdomain - Subdomain to check for existence
       * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating the existence of the subdomain
       */
      async function checkSubdomainExists(subdomain) {
        try {
          const existingSubdomain = await Subdomain.findOne({ subdomain });
      
          if (existingSubdomain) {
            return true; // Subdomain exists
          } else {
            return false; // Subdomain does not exist
          }
        } catch (error) {
          console.error(error);
          throw new Error('Error checking subdomain existence');
        }
      }
      
      /**
       * Check if the user has a subdomain in the database
       * 
       * @param {String} username - Username to check for a subdomain
       * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating if the user has a subdomain
       */
      async function checkUserHasSubdomain(username) {
        try {
          const user = await Subdomain.findOne({ username });      
          if (user && user.subdomain) {
            return true; // User has a subdomain
          } else {
            return false; // User does not have a subdomain
          }
        } catch (error) {
          console.error(error);
          throw new Error('Error checking user subdomain');
        }
      }
      
      /**
       * Create a new subdomain and associate it with the user
       * 
       * @param {String} username - Username to create the subdomain for
       * @returns {Promise} - A promise that resolves once the subdomain is created
       */
      async function createSubdomain(username) {
        try {
          const userHasSubdomain = await checkUserHasSubdomain(username);
      
          if (userHasSubdomain) {
            client.logger.info("User seems to have a subdomain already");
            //get the subdomain and return it
            const subdomainfound = await Subdomain.find({username: username}).then((subdomain) => {
                return subdomain[0].subdomain;
            });
            return subdomainfound;
        }
          else{
      
          let subdomainfood;
      
          do {
            subdomainfood = await createFood();
          } while (await checkSubdomainExists(subdomainfood));
      
          await Subdomain.create({
            username: username,
            subdomain: subdomainfood,
            });
      
          console.log(`Subdomain ${subdomainfood} created successfully for user ${username}`);
          return subdomainfood;
        }
        } catch (error) {
          console.error(error);
          throw new Error('Error creating subdomain');
        }
      }
    const resultofdomain = await createSubdomain(username);

    console.log('Domain: ' + resultofdomain);
    return new Promise((resolve, reject) => {
        const message = "Subdomain added";
        return resolve(message);
    });
}