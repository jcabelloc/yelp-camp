var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use (bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://onmilwaukee.com/images/articles/ca/camping/camping_fullsize_story1.jpg"},
    {name: "Granite Hill", image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"},
    {name: "Mountain Goat's Rest", image: "https://recreation-acm.activefederal.com/assetfactory.aspx?did=5221"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.listen(3000, function(req, res){
    console.log("Yelp Camp Server has started!!!");
});