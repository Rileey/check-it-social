import { Router } from 'express';
const router = Router();

//import controllers
import AuthController from '../controllers/AuthController.js';
import PostController from '../controllers/PostController.js';
import CommentController from '../controllers/CommentController.js';

//user routes
router.route('/register').post(AuthController.signup);
router.route('/login').post(AuthController.login);

//posts routes
router.route('/post').post(PostController.makePost)
router.route('/posts').get(PostController.getAll);

//comment routes
router.route('/comment').post(CommentController.post);
export default router;


