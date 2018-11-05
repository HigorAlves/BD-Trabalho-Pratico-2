import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faComment,
	faRetweet,
	faHeart,
	faLaugh,
	faClipboard
} from '@fortawesome/free-solid-svg-icons';

library.add(faComment, faRetweet, faHeart, faLaugh, faClipboard);

export const COMMENT = () => <FontAwesomeIcon icon={'comment'} />;
export const RETWEET = () => <FontAwesomeIcon icon={'retweet'} />;
export const HEART = () => <FontAwesomeIcon icon={'heart'} />;
export const SENTIMENT = () => <FontAwesomeIcon icon={'laugh'} />;
export const CLIPBOARD = () => <FontAwesomeIcon icon={'clipboard'}/>;
