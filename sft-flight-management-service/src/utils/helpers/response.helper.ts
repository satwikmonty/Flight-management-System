import type { Context } from 'hono';
import type { ResponseBodyType } from '../../types/common/response.type.js';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

/**
 * This utility helps in returning error API response
 * @param c
 * @param statusCode
 * @param errorMsg
 * @param developerErrorMsg
 * @returns Error API Response instance
 */
export function handleErrorResponse(
	c: Context,
	statusCode: ContentfulStatusCode,
	errorMsg: string,
	developerErrorMsg?: string
) {
	const responseBody: ResponseBodyType<undefined> = {
		msg: {
			errorMsg,
			developerErrorMsg,
		},
	};

	return c.json(responseBody, statusCode);
}

/**
 * This utility helps in returning success API response
 * @param c
 * @param statusCode
 * @param data
 * @param successMsg
 * @returns Success API Response instance
 */
export function handleSuccessResponse<T>(
	c: Context,
	statusCode: ContentfulStatusCode,
	data: T | T[],
	successMsg?: string
) {
	const responseBody: ResponseBodyType<T> = {
		data,
		msg: {
			successMsg,
		},
	};

	return c.json(responseBody, statusCode);
}
