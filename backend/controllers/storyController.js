const expressAsyncHandler = require("express-async-handler");
const Story = require("../models/storyModel");

const storyupload = expressAsyncHandler(async (req, res) => {
    const { userId, imagesUrl, viewedBy } = req.body;

    if (!userId || !imagesUrl) {
        return res.status(400).json({ message: "Please provide user ID and image URL" });
    }

    try {
        const newStory = await Story.create({ user: userId, imagesUrl, viewedBy });
        res.status(201).json(newStory);
    } catch (error) {
        res.status(500).json({ message: "Failed to upload story", error: error.message });
    }
});

const storydelete = expressAsyncHandler(async (req, res) => {
    const { storyId } = req.params;
    console.log(storyId);
    if (!storyId) {
        return res.status(400).json({ message: "Please provide the story ID" });
    }
    console.log("finded story");
    try {
        const story = await Story.findByIdAndDelete(storyId);
        
        if (!story) {
            return res.status(404).send({ message: "No story found with that ID" });
        }

        res.status(204).json({ message: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete story", error: error.message });
    }
});


const getstories = expressAsyncHandler(async (req, res) => {
    try {
        const stories = await Story.find().populate('user', '-password');
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch stories", error: error.message });
    }
});




module.exports={storyupload,storydelete,getstories}