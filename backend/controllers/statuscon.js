const expressAsync = require("express-async-handler");
const Status = require("../models/statusModel");
const addstatus = expressAsync(async (req, res) => {
  const { status, id } = req.body;
  if (!status) {
    return res.status(402).json({
      message: "Please add Status",
    });
  }
  try {
    const newStatus = await Status.create({
      text: status,
      user: req.user._id,
    });
    res.status(201).json(newStatus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add status", error: error.message });
  }
});

const likestatus = expressAsync(async (req, res) => {
  const { id } = req.body;
  try {
    const status = await Status.findById(id);
    if (!status) {
      return res.status(405).json({ message: "status not found" });
    }
    status.likes.push(req.user._id);
    await status.save();
    res.status(200).json({ message: "Status liked successfully", status });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to like status", error: error.message });
  }
});
const deletestatus = expressAsync(async (req, res) => {
  const { id } = req.body;
  try {
    const status = await Status.findByIdAndDelete(id);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json({ message: "Status deleted successfully", status });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete status", error: error.message });
  }
});

const updatestatus = expressAsync(async (req, res) => {
  const { id, newStatus } = req.body;

  try {
    const status = await Status.findByIdAndUpdate(
      id,
      { text: newStatus },
      { new: true }
    );

    if (!status) {
      return res.status(404).json({ message: "status not found" });
    }
    res.status(200).json({ message: "Status updated successfully", status });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating the comment", error: error.message });
  }
});

module.exports = { addstatus, likestatus, deletestatus, updatestatus };
