var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy= require("passport-local"),
    methodOverride= require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DATABASEURL || "mongodb://localhost/yelpDB";

// Requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

mongoose.connect(DBURL);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seed the database
//seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "Anything text that you want!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Adds currentUser to every single template
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // Add flash message to every single template
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success"); 
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(PORT, function(req, res){
    console.log("Yelp Camp Server has started!!!");
});