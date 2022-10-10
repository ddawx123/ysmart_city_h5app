/**
 * HttpClient Builder
 */

export class HttpClient {
    static post(url, param = {}) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(param),
                "method": "POST",
                "mode": "cors"
            }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    }
}
