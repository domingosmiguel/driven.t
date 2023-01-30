import { getDefaultEvent } from '@/controllers';
import { Router } from 'express';

const eventsRouter = Router();

eventsRouter.get('/', getDefaultEvent);

export { eventsRouter };
