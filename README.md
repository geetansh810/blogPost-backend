# blogPost-backend (RestAPI)

TechStack :-
- NodeJS
- ExpressJS
- MongoDB
- Authorization : JSON-Web-Token

Steps to run project :-
- clone aur download the code
- run command 
  - npm install
  - npm start
- now the server will start running at port: 5005 (http://localhost:5005/)

User Routes :-
- (POST) http://localhost:5005/api/user/signup : To create the user
- (POST) http://localhost:5005/api/user/signin : To signin the user
- (GET) http://localhost:5005/api/user/signout : To signout the user

Blog Routes :-
- (GET) http://localhost:5005/api/blog/all?page=N : To get all post from page N 
- (POST) http://localhost:5005/api/blog/:userId : To create the blog
- (PUT) http://localhost:5005/api/blog/:userId/:blogId : To update the blog
- (DELETE) http://localhost:5005/api/blog/:userId/:blogId : To delete the blog
