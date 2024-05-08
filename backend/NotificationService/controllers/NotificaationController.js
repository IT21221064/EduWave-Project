const Notification = require("../models/NotificationModel");

const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Cannot retrieve notifications" });
  }
};

const addNotification = async (req, res) => {
  const {userId,title, description} = req.body;
  if (!userId|| !title || !description) {
    return res.status(400).json({ message: "Fill the inputs" });
  }
  try {
    const notify = await Notification.create({ userId,title,description });
    res.status(200).json(notify);
  } catch (error) {
    res.status(400).json({ message: "" });
  }
};



const deleteNotification = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  try {
    await notification.deleteOne();
    return res.status(200).json({
      message: "Notification deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getNotificationById = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  res.status(200).json(notification);
};

const getNotificationsById = async (req, res) => {
  const notification = await Notification.findById(req.params.userId);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  res.status(200).json(notification);
};

module.exports = {
  getNotification,
  addNotification,
  deleteNotification,
  getNotificationById,
  getNotificationsById
};