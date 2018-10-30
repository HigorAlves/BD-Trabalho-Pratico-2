import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faComment,
	faRetweet,
	faHeart
} from '@fortawesome/free-solid-svg-icons';

library.add(faComment, faRetweet, faHeart);

export const COMMENT = () => <FontAwesomeIcon icon={'comment'} />;
export const RETWEET = () => <FontAwesomeIcon icon={'retweet'} />;
export const HEART = () => <FontAwesomeIcon icon={'heart'} />;
