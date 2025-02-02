export const getContent = async (fetch: any, path: string) => {
	let error: string | null = null;
	let status;
	let files: App.RepoContent = [];
	const response = await fetch(`/api/notes?path=${path}`);
	const data = await response.json();
	status = response.status;
	if (response.ok) {
		files = data.files;
	} else if (response.status === 404) {
		error = data.error;
	}

	return {
		error,
		files,
		status
	};
};

export const putContent = async (fetch: any, path: string, content: string, sha: string | null) => {
	const response = await fetch(`/api/notes?path=${path}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ content, sha })
	});
	return response;
};

export const b64DecodeUnicode = (str: string) => {
	try {
		return decodeURIComponent(
			atob(str)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);
	} catch (e) {}
};

export const b64EncodeUnicode = (str: string) => {
	try {
		return btoa(
			encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
				return String.fromCharCode(Number('0x' + p1));
			})
		);
	} catch (e) {}

	return '';
};
