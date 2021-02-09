export function randomString(length: number) {
  var result = '';
  var characters = 'ABCDEFGHJKMNPQRSTUVWXYZ123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
