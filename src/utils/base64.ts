export const convertImageUrlToBase64 = async (imageUrl: string): Promise<string> => {
	const response = await fetch(imageUrl);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === "string") {
				resolve(reader.result);
			} else {
				reject("Failed to convert image to Base64");
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};
