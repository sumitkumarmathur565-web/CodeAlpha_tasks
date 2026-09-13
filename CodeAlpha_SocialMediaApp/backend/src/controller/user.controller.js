const User = require('../model/user.model');
const Post = require('../model/post.model');

async function getProfile(req, res) {
    try {
        const { id } = req.params;

        const profileUser = await User.findById(id)
            .select('username email followers following');

        if (!profileUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await Post.find({ user: id })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        // check if the logged-in user is following this profile
        const currentUser = await User.findOne({ email: req.user.email });
        const isFollowing = profileUser.followers.includes(currentUser._id);
        const isOwnProfile = currentUser._id.toString() === id;

        return res.status(200).json({
            message: "Profile fetched",
            profile: {
                _id: profileUser._id,
                username: profileUser.username,
                followersCount: profileUser.followers.length,
                followingCount: profileUser.following.length,
                isFollowing,
                isOwnProfile
            },
            posts
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch profile" });
    }
}

async function followUser(req, res) {
    try {
        const { id } = req.params; // user to follow
        const currentUser = await User.findOne({ email: req.user.email });

        if (currentUser._id.toString() === id) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const targetUser = await User.findById(id);
        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (targetUser.followers.includes(currentUser._id)) {
            return res.status(400).json({ message: "Already following" });
        }

        targetUser.followers.push(currentUser._id);
        currentUser.following.push(targetUser._id);

        await targetUser.save();
        await currentUser.save();

        return res.status(200).json({ message: "Followed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Follow failed" });
    }
}

async function unfollowUser(req, res) {
    try {
        const { id } = req.params;
        const currentUser = await User.findOne({ email: req.user.email });
        const targetUser = await User.findById(id);

        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        targetUser.followers = targetUser.followers.filter(
            uid => uid.toString() !== currentUser._id.toString()
        );
        currentUser.following = currentUser.following.filter(
            uid => uid.toString() !== targetUser._id.toString()
        );

        await targetUser.save();
        await currentUser.save();

        return res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Unfollow failed" });
    }
}

module.exports = { getProfile, followUser, unfollowUser };