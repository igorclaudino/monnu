import { Router } from 'express';
import AuthController from './controllers/AuthController';

const routes = Router();

routes.post("/api/authenticate", AuthController.login);
routes.post("/api/register", AuthController.register);

export default routes;