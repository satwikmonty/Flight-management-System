export type ResponseMsgType = {
	successMsg?: string;
	errorMsg?: string;
	developerErrorMsg?: string;
};

export type ResponseBodyType<T> = {
	data?: T | T[];
	msg?: ResponseMsgType;
};
