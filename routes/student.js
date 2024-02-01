const express = require("express");
const { AdmissionInquiry } = require("../controller/student");
const routes = express.Router();

routes.post("/admission-inquiry", AdmissionInquiry);

module.exports = routes;
