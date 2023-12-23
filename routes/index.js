var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local")
const flash = require('express-flash');
// passport.use(new localStrategy(userModel.authenticate()))

const userPhotoModel = require("./userphoto")

const uploads = require("./multer");


const semisterData = require("../views/content/semister")




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
  try {

    // Check if the user is authenticated
    const isAuthenticated = req.isAuthenticated();

    // If the user is authenticated, retrieve user information from the database
    let user = null;
    if (isAuthenticated) {
      user = await userModel.findOne({ username: req.user.username });
    }

    // Render the 'index' view with data
    res.render('index', { title: 'Bytes Pedia', isAuthenticated, user });
  } catch (err) {
    // Handle any errors that may occur during the database query or rendering
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


router.get("/user", isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.user.username });
    res.render("user", { isAuthenticated: req.isAuthenticated(), user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});




router.get("/semister/:changableSemisterRoute", async function (req, res, next) {
  try {
    const changableSemisterRoute = req.params.changableSemisterRoute;

    // Assuming semisterData is defined
    const semisterContent = semisterData[changableSemisterRoute];

    if (semisterContent) {
      const user = await userModel.findOne({ username: req.user ? req.user.username : null });
      res.render("semister", { isAuthenticated: req.isAuthenticated(), user, semisterContent });
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








router.get("/signup", async function (req, res, next) {
  res.render("signup", { isAuthenticated: req.isAuthenticated() });
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


router.post("/signup", function (req, res, next) {

  const userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,

  })
  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/user")
      })
    })
});




// logi in router
router.get("/login", function (req, res, next) {
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
    const userphoto = new userPhotoModel({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
    })

    // Find the user by username
    const user = await userModel.findOne({ username: req.session.passport.user });

    // Update user information
    user.username = req.body.username || user.username; // Use existing value if not provided
    user.name = req.body.name || user.name; // Use existing value if not provided
    user.bio = req.body.bio || user.bio; // Use existing value if not provided

    // If a new avatar is uploaded, update the image field
    if (req.file) {
      user.image = req.file.filename;
    }

    // Save the updated user
    await user.save();
    await userphoto.save();
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
