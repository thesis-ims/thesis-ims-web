export function base64StringDecoder(data: string) {
  // console.log(data, "data");
  return `data:image/png;base64,${data}`;
}
