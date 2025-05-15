export async function convertFilesToBytes(
  files: File[],
): Promise<Uint8Array[]> {
  const byteArrays: Uint8Array[] = [];

  // Process each file sequentially
  for (const file of files) {
    const bytes = await fileToBytes(file);
    byteArrays.push(bytes);
  }

  return byteArrays;
}

function fileToBytes(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const bytes = new Uint8Array(reader.result);
        resolve(bytes);
      } else {
        reject(new Error("Failed to convert file to bytes"));
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsArrayBuffer(file);
  });
}
