import type { IMessage } from '@rocket.chat/core-typings';
import { isQuoteAttachment, isE2EEMessage } from '@rocket.chat/core-typings';
import { MessageBody } from '@rocket.chat/fuselage';
import { PreviewMarkup } from '@rocket.chat/gazzodown';
import type { Root } from '@rocket.chat/message-parser';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React, { memo } from 'react';

import GazzodownText from '../../../GazzodownText';

type ThreadMessagePreviewBodyProps = {
	message: IMessage;
};

const ThreadMessagePreviewBody = ({ message }: ThreadMessagePreviewBodyProps): ReactElement => {
	const t = useTranslation();
	const isEncryptedMessage = isE2EEMessage(message);

	const getMessage = () => {
		const mdTokens: Root | undefined = message.md && [...message.md];
		if (
			message.attachments &&
			Array.isArray(message.attachments) &&
			message.attachments.length > 0 &&
			isQuoteAttachment(message.attachments[0])
		) {
			mdTokens?.shift();
		}
		if (message.attachments && message.msg === '') {
			return <>{t('Message_with_attachment')}</>;
		}
		if (!isEncryptedMessage || message.e2e === 'done') {
			return mdTokens ? (
				<GazzodownText>
					<PreviewMarkup tokens={mdTokens} />
				</GazzodownText>
			) : (
				<>{message.msg}</>
			);
		}
		if (isEncryptedMessage && message.e2e === 'pending') {
			return <MessageBody>{t('E2E_message_encrypted_placeholder')}</MessageBody>;
		}
		return <>{message.msg}</>;
	};

	return getMessage();
};

export default memo(ThreadMessagePreviewBody);
