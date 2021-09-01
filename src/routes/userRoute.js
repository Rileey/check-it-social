import { Router } from 'express';
const router = Router();

//import controllers
import AuthController from '../controllers/AuthController.js';
import PostController from '../controllers/PostController.js';
import CommentController from '../controllers/CommentController.js';
import ProfileController from '../controllers/ProfileController.js';

//auth routes
router.route('/register').post(AuthController.signup);
router.route('/login').post(AuthController.login);


//profile routes
router.route('/users').get(ProfileController.getAll);
router.route('/user').post(ProfileController.createProfile);
router.route('/user/:profileId').get(ProfileController.getProfile)
.patch(ProfileController.updateProfile);


//posts routes
router.route('/post').post(PostController.makePost)
router.route('/posts').get(PostController.getAll);
router.route('/post/:postId').get(PostController.getPost)
.delete(PostController.deletePost).patch(PostController.updatePostText).patch(PostController.updatePostLink)

//comment routes
router.route('/comment').post(CommentController.post);
export default router;


