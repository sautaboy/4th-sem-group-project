var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local")
const flash = require('express-flash');

const userPhotoModel = require("./userphoto")
const feedbackModel = require('./feedback')

const uploads = require("./multer");

const bcaData = require("../views/content/semister")
const bsccsitData = require("../views/content/bsccsit")
const bbmData = require("../views/content/bbm")
const bitData = require("../views/content/bit")

passport.use(new localStrategy(
  { passReqToCallback: true },
  function (req, username, password, done) {
    userModel.authenticate()(username, password, function (err, user, message) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: message });
      }
      return done(null, user);
    });
  }
));







/* GET home page. */
router.get('/', async function (req, res, next) {

  const feedback = await feedbackModel.find().populate("user")

  try {

    // Check if the user is authenticated
    const isAuthenticated = req.isAuthenticated();

    // If the user is authenticated, retrieve user information from the database
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }

    // Render the 'index' view with data
    res.render('index', { title: 'Bytes Pedia', isAuthenticated, user, feedback });
  } catch (err) {
    // Handle any errors that may occur during the database query or rendering
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// feedback
router.post("/feedback", isLoggedIn, async function (req, res, next) {

  const user = await userModel.findOne({ username: req.user.username });
  const feedback = feedbackModel.create({
    comment: req.body.comment,
    user: user._id
  })


  user.feedback.push((feedback)._id);
  user.save()
  res.redirect("/")
});

/* GET allSemisterPastYearQuestions page. */
router.get('/allSemisterPastYearQuestions', async function (req, res, next) {
  try {

    // Check if the user is authenticated
    const isAuthenticated = req.isAuthenticated();

    // If the user is authenticated, retrieve user information from the database
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }

    // Render the 'index' view with data
    res.render('allSemisterPastYearQuestions', { title: 'Bytes Pedia', isAuthenticated, user });
  } catch (err) {
    // Handle any errors that may occur during the database query or rendering
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


/* GET Developer page. */
router.get('/developer', async function (req, res, next) {
  try {

    // Check if the user is authenticated
    const isAuthenticated = req.isAuthenticated();

    // If the user is authenticated, retrieve user information from the database
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }

    // Render the 'index' view with data
    res.render('developer', { title: 'Bytes Pedia', isAuthenticated, user });
  } catch (err) {
    // Handle any errors that may occur during the database query or rendering
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// get user page
router.get("/user", isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.user.username });
    res.render("user", { isAuthenticated: req.isAuthenticated(), user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});



// bca route
router.get("/bca", async function (req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }
    res.render('bca', { title: 'BCA / Bachelor in Computer Application', isAuthenticated, user });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// bsccsit route
router.get("/bsccsit", async function (req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }
    res.render('bsccsit', { title: 'BScCsit / Bachelor in Information Technology', isAuthenticated, user });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// bbm route
router.get("/bbm", async function (req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }
    res.render('bbm', { title: 'BBM / Bachelor in Busines Mathmatics', isAuthenticated, user });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// bit route
router.get("/bit", async function (req, res) {
  try {
    const isAuthenticated = req.isAuthenticated();
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }
    res.render('bit', { title: 'BIT / Bachelor in Information Technology', isAuthenticated, user });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});



// this is for bca
router.get("/bca/:changableSemisterRoute", async function (req, res, next) {
  try {
    const changableSemisterRoute = req.params.changableSemisterRoute;

    // Assuming bcaData is defined
    const semisterContent = bcaData[changableSemisterRoute];

    if (semisterContent) {
      const user = await userModel.findOne({ username: req.user ? req.user.username : null });
      res.render("semister", { isAuthenticated: req.isAuthenticated(), user, semisterContent, changableSemisterRoute });
    } else {
      res.status(404).send('Semester not found');
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

// this is for bsccsit
router.get("/bsccsit/:changableSemisterRoute", async function (req, res, next) {
  try {
    const changableSemisterRoute = req.params.changableSemisterRoute;

    // Assuming bcaData is defined
    const semisterContent = bsccsitData[changableSemisterRoute];

    if (semisterContent) {
      const user = await userModel.findOne({ username: req.user ? req.user.username : null });
      res.render("semister", { isAuthenticated: req.isAuthenticated(), user, semisterContent, changableSemisterRoute });
    } else {
      res.status(404).send('Semester not found');
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

// this is for bit
router.get("/bit/:changableSemisterRoute", async function (req, res, next) {
  try {
    const changableSemisterRoute = req.params.changableSemisterRoute;

    // Assuming bcaData is defined
    const semisterContent = bitData[changableSemisterRoute];

    if (semisterContent) {
      const user = await userModel.findOne({ username: req.user ? req.user.username : null });
      res.render("semister", { isAuthenticated: req.isAuthenticated(), user, semisterContent, changableSemisterRoute });
    } else {
      res.status(404).send('Semester not found');
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

// this is for bbm
router.get("/bbm/:changableSemisterRoute", async function (req, res, next) {
  try {
    const changableSemisterRoute = req.params.changableSemisterRoute;

    // Assuming bcaData is defined
    const semisterContent = bbmData[changableSemisterRoute];

    if (semisterContent) {
      const user = await userModel.findOne({ username: req.user ? req.user.username : null });
      res.render("semister", { isAuthenticated: req.isAuthenticated(), user, semisterContent, changableSemisterRoute });
    } else {
      res.status(404).send('Semester not found');
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

// Assuming you have a route for bookmarking subjects
router.post("/bookmark", isLoggedIn, async function (req, res, next) {
  try {
    const { title, url } = req.body;

    // Find the user by username
    const user = await userModel.findOne({ username: req.user.username });

    // Check if the subject is already bookmarked
    const isBookmarked = user.bookmarks.some(bookmark => bookmark.title === title);

    if (!isBookmarked) {
      // If not bookmarked, add it to the user's bookmarks
      user.bookmarks.push({ title, url });
      await user.save();
      res.status(200).send('Subject bookmarked successfully');
    } else {
      // Subject is already bookmarked, you can handle this case accordingly
      res.status(400).send('Subject already bookmarked');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Assume you have a route like '/removeBookmark' that handles bookmark removal
router.post('/removeBookmark', isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.user.username });

    // Get the bookmark title and URL from the request body
    const { title, url } = req.body;

    // Remove the bookmark from the user's bookmarks array
    user.bookmarks = user.bookmarks.filter(bookmark => !(bookmark.title === title && bookmark.url === url));

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Bookmark removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







// Assuming you have a route for the signup page
router.get('/signup', function (req, res, next) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, redirect to the user's profile page
    return res.redirect('/user');
  }

  // If not authenticated, render the signup page
  res.render('signup', { isAuthenticated: req.isAuthenticated() });
});



// editing profile 
router.get("/editprofile", isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.user.username });
    res.render("editprofile", { isAuthenticated: req.isAuthenticated(), user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});


router.post("/signup", async function (req, res, next) {
  try {
    // Check if the username already exists in the database
    const existingUser = await userModel.findOne({ username: req.body.username }).exec();
    if (existingUser) {
      // If the username already exists, send a response with an error message
      // return res.status(400).send('Username is already taken');
      res.render("usernametaken")
    }

    // If the username is not taken, proceed with creating the new user
    const userData = new userModel({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
    });

    await userModel.register(userData, req.body.password);
    passport.authenticate("local")(req, res, function () {
      res.redirect("/user");
    });
  } catch (error) {
    // Handle any errors that occur during the process
    next(error);
  }
});





// Login route
router.get("/login", function (req, res, next) {
  // Check if the user is already authenticated
  if (req.isAuthenticated()) {
    // If authenticated, redirect to the user page
    return res.redirect("/user");
  }

  // If not authenticated, render the login page
  res.render("login", { isAuthenticated: req.isAuthenticated(), message: req.flash("error") });
});


// check the user is there or not
router.post("/login", passport.authenticate("local", {
  successRedirect: "/user",
  failureRedirect: "/login",
  failureFlash: true, // Enable flash messages for failed login

}));



// Logout route
router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(function () {
    res.redirect("/login");

  });  // This is enough, you don't need the isLoggedIn middleware for logout
});


// POST logout route (if you want to handle logout via a POST request)
router.post('/logout', function (req, res, next) {
  req.logout(function () {
    res.redirect('/');
  });
});
router.post("/editprofile", isLoggedIn, uploads.single('image'), async function (req, res, next) {
  try {
    // Find the user by username
    const user = await userModel.findOne({ username: req.session.passport.user });

    // Update user information based on the provided fields
    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.bio) {
      user.bio = req.body.bio;
    }

    // If a new avatar is uploaded, update the image field
    if (req.file) {
      const userphoto = new userPhotoModel({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
      });
      user.image = req.file.filename;

      // Save the user photo
      await userphoto.save();
    }

    // Save the updated user
    await user.save();
    res.redirect("/user");
  } catch (err) {
    console.error(err);
    res.redirect("/user");
  }
});






function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
