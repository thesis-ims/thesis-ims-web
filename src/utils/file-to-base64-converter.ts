export async function convertFilesToBase64(files: File[]): Promise<string[]> {
  const base64Strings: string[] = [];

  // Process each file sequentially
  for (const file of files) {
    const base64 = await fileToBase64(file);
    base64Strings.push(base64);
  }

  return base64Strings;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Extract just the base64 part by removing the data URL prefix
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}
