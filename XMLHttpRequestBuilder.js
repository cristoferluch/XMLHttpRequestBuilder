class HTTPRequestBuilder {
  constructor() {
      this._xhr = new XMLHttpRequest();
      this._url = "";
      this._method = "GET";
      this._body = "";
      this._timeout = 0;
      this._headers = {};
      this._params = {};
  }

  url(url) {
      this._url = url;
      return this;
  }

  method(method) {
      this._method = method.toUpperCase();
      return this;
  }

  body(body) {
      this._body = body;
      return this;
  }

  timeout(timeout) {
      this._timeout = timeout;
      return this;
  }

  header(key, value) {
      this._headers[key] = value;
      return this;
  }

  params(params) {
      this._params = params;
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

      if (!this._url) {
          throw new Error("URL is required");
      }

      if (!this._method) {
          throw new Error("Method is required");
      }

      if (!methods.includes(this._method)) {
          throw new Error("Method not allowd");
      }

      const url = new URL(this._url);

      Object.entries(this._params).forEach(([key, value]) => {
          if (key !== null && value !== undefined) {
              url.searchParams.append(key, value);
          }
      });

      this._xhr.open(this._method, url);

      Object.entries(this._headers).forEach(([key, value]) => {
          if (key !== null && value != undefined) {
              this._xhr.setRequestHeader(key, value);
          }
      });

      if (this._timeout != 0) {
          this._xhr.timeout = this._timeout;
      }

      return new Promise((resolve, reject) => {
          this._xhr.onload = () => {
              if (this._xhr.status == 200) {
                  resolve(this._xhr);
              } else {
                  reject(this._xhr);
              }
          };

          this._xhr.onerror = () => {
              reject(this._xhr);
          };

          this._xhr.ontimeout = () => {
              reject(this._xhr);
          };

          this._xhr.send(
              typeof this._body === "string"
                  ? this._body
                  : JSON.stringify(this._body),
          );
      });
  }
}
