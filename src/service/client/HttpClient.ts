export interface ResponseEntity {
  responseObj: any;
  statusCode: number;
  headers: Headers;
  message?: string;
}

export class HttpClient {
  public static async get(url: string): Promise<ResponseEntity> {
    return fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      async (response: Response) => await HttpClient.handleResponse(response)
    );
  }

  public static async post(url: string, body: any): Promise<ResponseEntity> {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then(
      async (response: Response) => await HttpClient.handleResponse(response)
    );
  }

  private static async handleResponse(
    response: Response
  ): Promise<ResponseEntity> {
    try {
      let responseObj = await response.text();

      return {
        responseObj: responseObj ? JSON.parse(responseObj) : {},
        headers: response.headers,
        statusCode: response.status,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
