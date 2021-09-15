import { Router } from 'express';
const router = Router();

//import controllers
import AuthController from '../controllers/AuthController.js';
import PostController from '../controllers/PostController.js';
import CommentController from '../controllers/CommentController.js';
import ProfileController from '../controllers/ProfileController.js';
import CommunityController from '../controllers/CommunityController.js';

//auth routes
router.route('/register').post(AuthController.signup);
router.route('/login').post(AuthController.login);


//user routes
// router.route('/profile').post(ProfileController.createProfile);
router.route('/profiles').get(ProfileController.getAll);
router.route('/profile').get(ProfileController.getProfile)
.delete(ProfileController.deleteProfile)
.patch(ProfileController.updateProfile);
router.route('/profiles/:profileId/follow').put(ProfileController.followProfile);
router.route('/profiles/:profileId/unfollow').put(ProfileController.unfollowProfile);
router.route('/profiles/friends/:profileId').get(ProfileController.getFriends);

//community routes
router.route('/communities').get(CommunityController.getAllCommunities);
router.route('/community').get(CommunityController.getCommunity)
.delete(CommunityController.deleteCommunity)
.put(CommunityController.updateCommunity)
.post(CommunityController.createCommunity)
router.route('/communities/:communityId/follow').put(CommunityController.followCommunity);
router.route('/communities/:communityId/unfollow').put(CommunityController.unfollowCommunity);
router.route('/communities/follow/:communityId').get(CommunityController.getFollowers)
router.route('/community/timeline/:communityId').get(CommunityController.getCommunityTimeline)


//posts routes
router.route('/post').post(PostController.makePost)
router.route('/posts').get(PostController.getAll)
router.route('/posts/:name').get(PostController.getUsersPost);
router.route('/posts/timeline/:profileId').get(PostController.getTimeline);
router.route('/posts/:postId').get(PostController.getPost)
.delete(PostController.deletePost).patch(PostController.updatePostText).patch(PostController.updatePostLink)

//liking and disliking a post
router.route('/posts/:postId/like').put(PostController.likePost)

//comment routes
router.route('/comment').post(CommentController.post);
router.route('/comments').get(CommentController.getAll);
router.route('/comments/:commentId').patch(CommentController.updateComment)
.get(CommentController.getComment)
.delete(CommentController.deleteComment);




export default router;


