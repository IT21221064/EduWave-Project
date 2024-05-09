const express = require("express");
const router = express.Router();

const {
  addNotification,
  getNotification,
  getNotificationById,
  deleteNotification,
  getNotificationsById,
} = require("../controllers/NotificaationController");

router.route("/").get(getNotification).post(addNotification);

router
  .route("/:id")
  .get(getNotificationById)
  .get(getNotificationsById)
  .delete(deleteNotification);

module.exports = router;