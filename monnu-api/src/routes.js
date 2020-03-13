import { Router } from 'express';
import AuthController from './controllers/AuthController';
import AppController from './controllers/AppController';

import token from './middlewares/token';

const routes = Router();

routes.post("/api/authenticate", AuthController.login);
routes.post("/api/register", AuthController.register);

routes.get("/api/apps", token, AppController.index);
routes.post("/api/apps", token, AppController.store);



export default routes;