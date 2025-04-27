# XMLHttpRequestBuilder

JavaScript builder for XMLHttpRequest.

## Features

- Fluent builder pattern API
- Supports all HTTP methods (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)
- Request parameter handling
- Custom headers support
- Request timeout configuration

## Installation

Simply include the script in your HTML file

## Usage

````shel
new HTTPRequestBuilder()
  .url("https://pokeapi.co/api/v2/pokemon")
  .method("GET")
  .header("Accept", "application/json")
  .params({ limit: 100, offset: 2 })
  .timeout(2000)
  .send()
  .then((response) => console.log(JSON.parse(response.response)))
  .catch((error) => console.log(error));
````

## API Methods

#### Set the target URL for the request.
````shel
.url(url: string)    
````
#### Set HTTP method (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS).
````shel
.method(method: string)  
````
#### Set request body data.
````shel
.body(data: any) 
````
#### Set request timeout in milliseconds.
````shel
.timeout(ms: number)   
````
#### Add a custom header to the request.
````shel
.header(key: string, value: string)  
````
#### Add URL parameters.
````shel
.params(object: Object)   
````
#### Execute
````shel
send()     
````