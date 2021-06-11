import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
import AddressController from '../controllers/AddressController';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.post('/', addressController.create);
addressRouter.get('/', addressController.index);
export default addressRouter;
