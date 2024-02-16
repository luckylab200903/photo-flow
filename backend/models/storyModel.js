const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true 
},
    imageUrl: 
    {
        type: String,
        required: true 
    },
});

const Story = mongoose.model("Story", storySchema);
