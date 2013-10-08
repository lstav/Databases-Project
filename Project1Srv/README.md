<h1>Databases-Project Srv</h1>
This project shows a simple Node.js server, using a REST API
to serve client requests over HTTP. You will need to install 
<a href="http://nodejs.org/">Node.js</a> in your machine to 
run this server. The server uses the 
<a href="http://expressjs.com">Express</a> module for Node.js.
Express is already added the project, but for new projects you need
to add it, following the commands shown <a href="http://expressjs.com/guide.html">here</a>.
 
The structure of the project is: <br/>
a) server.js - the server application that feeds data into Project1.<br/>
b) account.js  - implementation of account object.<br/>
c) category.js  - implementation of category object.<br/>
d) history.js  - implementation of history object.<br/>
e) message.js  - implementation of message object.<br/>
f) shoppingcart.js  - implementation of shopping cart object.<br/>
g) package.json - configuration file for the project </br>
h) node_modules - directory with the required Node.js modules.<br/>

<h2>Editing:</h2>
Simply import this project to an IDE, such as Aptana 3. In such case,
use the File->Import->General->Existing Projects into Workspace
and provide the location of the directory for the project.

<h2>Running:</h2>
Node.js runs as a standalone server. From the command prompt, go to the 
project directory  run it as follows: <br/>

> node server.js </br>

The server will run on port 3412.

