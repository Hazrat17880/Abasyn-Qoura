
const express = require("express");
const controller = require('../Controllers/Controller')
const route = express.Router();

route.get("/signup",controller.Registration_get)
route.post("/signup",controller.Registration_post);
route.get("/login",controller.Login_get)
route.post('/login',controller.Login_post)
route.get('',controller.RenderHome)
route.get('/home',controller.RenderHome)
route.post('/question',controller.question_Upload);








module.exports = route;