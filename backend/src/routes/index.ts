import { Router } from 'express';
import { authRouter, userRouter } from './authRoutes';
import { pickupRouter } from './pickupRoutes';
import {
  binRouter,
  vehicleRouter,
  routeRouter,
  scenarioRouter,
  facilityRouter,
  reportRouter,
  rewardRouter,
  notificationRouter,
  aiRouter,
  analyticsRouter
} from './binRoutes';
import { db } from '../database/mockDb';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/pickups', pickupRouter);
apiRouter.use('/bins', binRouter);
apiRouter.use('/vehicles', vehicleRouter);
apiRouter.use('/routes', routeRouter);
apiRouter.use('/scenarios', scenarioRouter);
apiRouter.use('/facilities', facilityRouter);
apiRouter.use('/reports', reportRouter);
apiRouter.use('/rewards', rewardRouter);
apiRouter.use('/notifications', notificationRouter);
apiRouter.use('/ai', aiRouter);
apiRouter.use('/', analyticsRouter);

// Demo Database Reset Endpoint
apiRouter.post('/demo/reset', (req, res) => {
  db.reset();
  res.status(200).json({
    success: true,
    message: 'Mock database successfully reset to baseline seed state.',
    label: 'DEMO DATA'
  });
});
