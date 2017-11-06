# SC-Task

### Setup

SC-Task requires [Node.js](https://nodejs.org/) v7+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/sourabhdattawad/sc-task.git
$ cd sc-task
$ npm install
$ npm start
```
Goto http://localhost:3000/ you must see Hello World.
# Features

  - Authentication with JWT
  - JSON patching
  - Thumbnail generator

### JSdocs

```sh
$ npm run opendocs
```
Opens documentation on browser

### Swagger
Goto http://localhost:3000/api-docs 

Contains all route definitions


### Testing
```sh
$ npm run test
```
Runs all tests
### Istanbul coverage
```sh
$ npm run showcoverage
```
Opens coverage on browser.

### Usage
Use Postman or Swagger for testing
Goto http://localhost.com/api-docs for swaggwer
![alt text](https://i.imgur.com/MiEfULc.png)

#### Test examples
#####  /user/authenticate
Click on try
Fill the request object
Ex:

```sh
{
  "email": "foo@bar.com",
  "password": "foobar"
}
```
returns JWT token on success

#####   /admin/json-patch
Click on try
Fill the request object
Ex:

```sh
{
  "json_object": { "baz": "qux", "foo": "bar" },
  "json_patch": [ { "op": "replace", "path": "/baz", "value": "boo" }, { "op": "add", "path": "/hello", "value": ["world"] }, { "op": "remove", "path": "/foo"} ],
  "token":"FooooBaaaar"
}
```
returns JSON patched object on success

#####  /admin/create-thumbnail
Click on try
Fill the request object
Ex:

```sh
{
  "image_url": "https://www.drupal.org/files/drupal%208%20logo%20isolated%20CMYK%2072.png",
  "token": "fooooobaaaar"
}
```
returns image thumbnail

### Version
v1

