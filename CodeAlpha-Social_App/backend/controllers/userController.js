import User from '../models/userModel.js';
import Post from '../models/postModel.js';


export const getUserProfile = async (req, res) => {
    try {

        const user = await User.findOne({ username: req.params.username })
            .select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

        res.json({
            user,
            posts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const followUser = async (req, res, next) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if (!userToFollow) return res.status(404).json({ message: "User not found" });
        if (!loggedInUser) return res.status(404).json({ message: "Logged in user not found" });

        if (userToFollow._id.toString() === loggedInUser._id.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }


        if (!Array.isArray(loggedInUser.following)) loggedInUser.following = [];
        if (!Array.isArray(loggedInUser.followers)) loggedInUser.followers = [];
        if (!Array.isArray(userToFollow.following)) userToFollow.following = [];
        if (!Array.isArray(userToFollow.followers)) userToFollow.followers = [];

        const isFollowing = loggedInUser.following.some(id => id.toString() === userToFollow._id.toString());

        if (isFollowing) {
            loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userToFollow._id.toString());
            userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== loggedInUser._id.toString());
        } else {
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);
        }

        await loggedInUser.save();
        await userToFollow.save();

        res.json({ message: isFollowing ? "Unfollowed successfully" : "Followed successfully" });
    } catch (error) {

        console.error("Full Follow Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const loggedInUser = await User.findById(req.user._id);

        if (!loggedInUser) return res.status(404).json({ message: "User not found" });


        if (name) loggedInUser.name = name;
        if (bio) loggedInUser.bio = bio;

        await loggedInUser.save();

        res.json({
            _id: loggedInUser._id,
            name: loggedInUser.name,
            username: loggedInUser.username,
            email: loggedInUser.email,
            profilePic: loggedInUser.profilePic,
            bio: loggedInUser.bio,
            followers: loggedInUser.followers,
            following: loggedInUser.following,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.json([]);
        }


        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } }
            ],

            _id: { $ne: req.user._id }
        }).select("-password");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};