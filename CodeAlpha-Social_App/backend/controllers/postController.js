import Post from '../models/postModel.js';
import User from '../models/userModel.js';


export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Post cannot be empty" });

        const newPost = new Post({
            user: req.user._id,
            text
        });

        await newPost.save();

        const populatedPost = await newPost.populate('user', 'name username profilePic');
        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllPosts = async (req, res) => {
    try {
        const loggedInUser = await User.findById(req.user._id);
        const followingIds = loggedInUser.following;
        followingIds.push(req.user._id);

        const posts = await Post.find({ user: { $in: followingIds } })
            .sort({ createdAt: -1 })
            .populate('user', 'name username profilePic');

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const alreadyLiked = post.likes.includes(req.user._id);

        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();

        res.json(await post.populate('user', 'name username profilePic'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const newComment = {
            text,
            user: req.user._id,
            name: req.user.name
        };

        post.comments.push(newComment);
        await post.save();

        res.json(await post.populate('user', 'name username profilePic'));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};