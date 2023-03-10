const express = require("express");
const router = express.Router();
const { getHome, postHome, getShows } = require("../controller/controller");

router.route("/").get(getHome).post(postHome);
router.route("/shows/:topic").get(getShows);

module.exports = router;
