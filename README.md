### Project Description


This is the Bookmark Manager app to save favourite website links.

After user is authorised with OpenID (in this case Google), the app provides ability to: 

- get the list of bookmarks saved by the user

- save, rename, delete a bookmark

- create, rename, delete categories

If the user is new, he/she is going to be provided with default generic bookmarks and folders which could be easily deleted.


### How to run the app


Requirements: 

Make sure you've installed [Docker](https://www.docker.com/) and [Docker Compose]([https://docs.docker.com/compose/)]

1. git clone `git@github.com:nattts/bookmark-manager.git`.

2. make sure Docker is running on your local machine.

3. `cd` into main directory and run `docker-compose up`. 

Might take a little while to install all necessary dependencies.

4. in the browser open http://127.0.0.1:3000

API documentation is available at http://127.0.0.1:5000/api-docs



### Run some tests

`npm test`


## Application architecture


This project's architecture is inspired by Uncle Bob's 'The Clean Architecture'.
This architecture attempts to integrate some of the leading modern architecture like Hexagonal Architecture, Onion Architecture, Screaming Architecture into one main architecture. It aims to achieve good separation of concerns. Like most architecture, it also aims to make the application more flexible to inevitable changes in client requirements

Application is separated  into 4 different layers:
  1. Use cases
  2. Interface
  3. Infrastructure 
  4. Frameworks



### Project structure

```
├── README.md
├── api
│   ├── Dockerfile
│   ├── api-doc
│   │   └── swaggerDoc.json
│   ├── app.js
│   ├── lib
│   │   ├── frameworks
│   │   ├── infrastructure
│   │   ├── interface
│   │   └── use-cases
│   ├── package-lock.json
│   ├── package.json
│   └── tests
│       └── use-cases
├── client
│   ├── Dockerfile
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── auth0-spa.js
│       ├── components
│       ├── index.css
│       ├── index.js
│       └── utils
└── docker-compose.yml
```

### Future development

- Export and import of bookmarks.



### Technology used

Node.js
Express.js
MongoDB
Jest
Auth0
Swagger
Docker




