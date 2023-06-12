import '../apps/startup';
import './apps';
import './audit';
import './deviceManagement';
import './engagementDashboard';
import './seatsCap';
import './services';
import './upsell';
import '../../../app/apps/server/api';
import { api } from '@rocket.chat/core-services';

import { isRunningMs } from '../../../server/lib/isRunningMs';

// only starts network broker if running in micro services mode
if (isRunningMs()) {
	const { broker } = await import('./broker');

	api.setBroker(broker);
	void api.start();
} else {
	require('./presence');
}
