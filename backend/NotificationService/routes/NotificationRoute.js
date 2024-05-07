const express = require("express");
const router = express.Router();

const {
  addNotification,
  getNotification,
  getNotificationById,
  deleteNotification,
} = require("../controllers/NotificaationController");

router.route("/").get(getNotification).post(addNotification);

router
  .route("/:id")
  .get(getNotificationById)
  .delete(deleteNotification);

module.exports = router;