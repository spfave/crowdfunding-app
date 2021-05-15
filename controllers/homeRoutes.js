// Import modules/dependencies
const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route serves Project data
router.get('/', async (req, res) => {
    try {
      const projectData = await Project.findAll({
        include: [{ model: User }],
        // order: [['name', 'ASC']],
      });
  
      const projects = projectData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', { projects });
    } catch (err) {
      res.status(500).json("Internal server error. Please try again!");
    }
});

// Specific project route
router.get('/project/:id', withAuth, async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id, {
          include: [{ model: User }]
        });

        const projects = projectData.get({ plain: true });
        res.render('id', { projects });
      } catch (err) {
        console.log(err);
        res.status(500).json("Internal server error. Please try again!");
      }
    });

// Log In route ("login.handlebars")
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

// User Profile route ("profile.handlebars")
router.get('/profile', withAuth, (req, res) => {

});

module.exports = router;