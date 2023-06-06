export default function bitly(url) {
  let responseJson;
  const xhr = new XMLHttpRequest();
  const urlXhr = `https://api-ssl.bitly.com/v3/shorten?longUrl=${url}&access_token=eac14bdff5fc6fcc7310ccb2776471aacabed745`;
  xhr.open("GET", urlXhr);
  xhr.send();

  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          responseJson = JSON.parse(xhr.response);
          resolve(responseJson);
        } else {
          reject(xhr);
        }
      }
    };
  });
}
