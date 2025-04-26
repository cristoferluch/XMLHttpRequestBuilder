class HTTPRequestBuilder {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.url = "";
    this.method = "";
    this.body = "";
    this.timeout = 0;
    this.headers = {};
    this.params = {};
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setMethod(method) {
    this.method = method.toUpperCase();
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  setTimeout(timeout) {
    this.timeout = timeout;
    return this;
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  setParams(params) {
    this.params = params;
    return this;
  }

  send() {
    const methods = [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "HEAD",
      "OPTIONS",
    ];

    if (!this.url) {
      throw new Error("URL is required");
    }

    if (!this.method) {
      throw new Error("Method is required");
    }

    if (!methods.includes(this.method)) {
      throw new Error("Method not allowd");
    }

    const url = new URL(this.url);

    Object.entries(this.params).forEach(([key, value]) => {
      if (key !== null && value !== undefined) {
        url.searchParams.set(key, value);
      }
    });

    this.xhr.open(this.method, url);

    Object.entries(this.headers).forEach(([key, value]) => {
      this.xhr.setRequestHeader(key, value);
    });

    if (this.timeout != 0) {
      this.xhr.timeout = this.timeout;
    }

    return new Promise((resolve, reject) => {
      this.xhr.onload = () => {
        if (this.xhr.status == 200) {
          resolve(this.xhr);
        } else {
          reject(new Error("Request failed"));
        }
      };

      this.xhr.onerror = () => {
        reject(new Error("Request failed"));
      };

      this.xhr.ontimeout = () => {
        reject(new Error("Request timed out"));
      };

      this.xhr.send(this.body || null);
    });
  }
}

const request = await new HTTPRequestBuilder()
  .setUrl("https://pokeapi.co/api/v2/pokemon")
  .setMethod("GET")
  .setHeader("Accept", "application/json")
  .setParams({ limit: 100, offset: 2 })
  .setTimeout(2000)
  .send();

console.log(JSON.parse(request.response));
