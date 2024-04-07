##

##

## Social Media Platform API

Welcome to the Backend Engineer Assessment! In this project, you will build a RESTful API for a basic social media platform. This API will facilitate user interactions and data management within the platform.

##

### Functionalities

##

## User Management

Users can register and create accounts.
Users can log in and authenticate themselves (consider options like JWT or session-based authentication).

## Posts and Feed

Users can create posts with text and optional image/video attachments.
Users can follow other users.
Users can see posts from the people they follow in their personalized feed.
Implement pagination for retrieving large amounts of data efficiently.

## Likes and Comments

Users can like and comment on posts created by others.
Users can see the number of likes and comments on a post.

## Notifications

Users can receive notifications for mentions, likes, and comments (bonus points for implementing real-time notifications using websockets or push notifications).

## Technical Specifications

---Use Express.js and TypeScript.
---Implement MongoDB as your scalable database solution to store user data, posts, and other information.
---Design the API with performance and scalability in mind.
Implement caching mechanisms to improve response times for frequently accessed data.
---Use asynchronous programming techniques (optional, but bonus points) to handle concurrent requests efficiently.
---Implement error handling and return appropriate HTTP status codes for different scenarios.
---Write clean, well-documented, and maintainable code.
---Consider unit testing to ensure code functionality and integration testing to verify communication between different components.

### Project Setup Instructions

---Clone this repository to your local machine.
---Install dependencies by running npm install.
---Set up a MongoDB database and configure the connection in your environment variables or a configuration file.
---Run the API server using npm start.

### API Endpoints

##

## User Management

##

# Register User

- **URL:** `auth/signup`
- **Method:** `POST`
- **Description:** Register a new user account.
- **Request Status:** `200`
  ```json
  {
    "username": "example_user",
    "email": "mgiwa78@gmail.com",
    "fullName": "Full name",
    "password": "password"
  }
  ```
- **Response Body:**
  ```json
  {
    "userAuth": {
      "email": "superadmin@gmail.com",
      "fullName": "Muhammad",
      "followers": ["661317c48f69a720b83c8497", "661317987d7001565d5f13c8"]
    },
    "userJwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MTMxMGQ2NzA1NzI1ZmM4N2QxYzkwNCIsImZ1bGxOYW1lIjoiTXVoYW1tYWQiLCJ1c2VyTmFtZSI6Im1naXdhIiwicGFzc3dvcmQiOiI4ZjVkYmZlNjAyYzRiOThlNTYwNTNiMzIwYzAyNzJhZGM4NTQxNWZkZjc0ODYwZDg4NjYyOGE0YWFkYmU4ZDVlZmFmMjBiNTdhMmEzNmVhN2EyNWMwODljMGYyYzkyNWEwMjI4ZjRiYzkwY2I5N2NmYTM2MjYxMzE3NzhkZmY5MS4zMWNlMWJlYjIwMjUzYTRlIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImZvbGxvd2VycyI6WyI2NjEzMTdjNDhmNjlhNzIwYjgzYzg0OTciLCI2NjEzMTc5ODdkNzAwMTU2NWQ1ZjEzYzgiXSwiY3JlYXRlZEF0IjoiMjAyNC0wNC0wN1QyMTozMjowNi4xNjBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNC0wN1QyMzozNjoxMC44NjVaIiwiX192IjowfSwiaWF0IjoxNzEyNTMzMjc2fQ.JN2jNyYsJJafYNpVD4DmoTqWtBJZK3zYLjorIyQbyCA"
  }
  ```

##

##

##

# User Login

- **URL:** `auth/signin`
- **Method:** `POST`
- **Description:** Login user in and provide JWT.
- **Request Status:** `200`
  ```json
  {
    "email": "mgiwa78@gmail.com",
    "password": "password"
  }
  ```
- **Response Status:** `200`
- **Response Body:**
  ```json
  {
    "userAuth": {
      "email": "superadmin@gmail.com",
      "fullName": "Muhammad",
      "followers": ["661317c48f69a720b83c8497", "661317987d7001565d5f13c8"]
    },
    "userJwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MTMxMGQ2NzA1NzI1ZmM4N2QxYzkwNCIsImZ1bGxOYW1lIjoiTXVoYW1tYWQiLCJ1c2VyTmFtZSI6Im1naXdhIiwicGFzc3dvcmQiOiI4ZjVkYmZlNjAyYzRiOThlNTYwNTNiMzIwYzAyNzJhZGM4NTQxNWZkZjc0ODYwZDg4NjYyOGE0YWFkYmU4ZDVlZmFmMjBiNTdhMmEzNmVhN2EyNWMwODljMGYyYzkyNWEwMjI4ZjRiYzkwY2I5N2NmYTM2MjYxMzE3NzhkZmY5MS4zMWNlMWJlYjIwMjUzYTRlIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImZvbGxvd2VycyI6WyI2NjEzMTdjNDhmNjlhNzIwYjgzYzg0OTciLCI2NjEzMTc5ODdkNzAwMTU2NWQ1ZjEzYzgiXSwiY3JlYXRlZEF0IjoiMjAyNC0wNC0wN1QyMTozMjowNi4xNjBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNC0wN1QyMzozNjoxMC44NjVaIiwiX192IjowfSwiaWF0IjoxNzEyNTMzMjc2fQ.JN2jNyYsJJafYNpVD4DmoTqWtBJZK3zYLjorIyQbyCA"
  }
  ```

# Follow User

- **URL:** `users/follow-user`
- **Method:** `PUT`
- **Description:** Follow user, need to provide id of user to be followed.
  ```json
  {
    "toBeFollowed": "661310d6705725fc87d1c904"
  }
  ```
- **Response Body:**
  ```json
  {
    "status": "success"
  }
  ```

##

##

## Posts Management

##

# Create Post

- **URL:** `posts`
- **Method:** `POST`
- **Authentication:** Required (JWT token)
- **Description:** Create a new post with text content.
- **Request Body:**
  ```json
  {
    "body": "Post content goes here"
  }
  ```
  - **Response Status: 200 Ok**
  - **Response Body:**
  ```json
  {
    "status": "success",
    "data": {
      "body": "My post body",
      "author": "661317987d7001565d5f13c8",
      "comments": [],
      "likes": [],
      "_id": "6613301a9aa2fff663961bb7",
      "createdAt": "2024-04-07T23:45:30.874Z",
      "updatedAt": "2024-04-07T23:45:30.874Z",
      "__v": 0
    }
  }
  ```

##

##

##

# Add Post Image

- **URL:** `posts/set-image-url/:postId`
- **Method:** `POST`
- **Authentication:** Required (JWT token)
- **Description:** Add Post image url after upload.
- **Request Body:**
  ```json
  {
    "image": "ImageUrl"
  }
  ```
  - **Response Status: 200 Ok**
  - **Response Body:**
  ```json
  {
    "_id": "66132679edc111aea544c114",
    "body": "My post body",
    "author": "661310d6705725fc87d1c904",
    "comments": [],
    "likes": [],
    "__v": 0,
    "image": "ImageUrl"
  }[]
  ```

##

##

##

# Add Post Video

- **URL:** `posts/set-video-url/:postId`
- **Method:** `POST`
- **Authentication:** Required (JWT token)
- **Description:** Add Post video url after upload.
- **Request Body:**

  ```json
  {
    "video": "VideoUrl"
  }
  ```

- **Response Status: 200 Ok**
- **Response Body:**

```json
{
  "_id": "66132679edc111aea544c114",
  "body": "My post body",
  "author": "661310d6705725fc87d1c904",
  "comments": [],
  "likes": [],
  "__v": 0,
  "video": "VideoUrl"
}[]
```

##

##

##

# Get Post

- **URL:** `posts/:postId`
- **Method:** `GET`
- **Authentication:** Required (JWT token)
- **Description:** Get post with text content and image/video urls.
- **Request Body:**

  ```json
  {}
  ```

  - **Response Status: 200 Ok**
  - **Response Body:**

  ```json
  {
    "status": "success",
    "data": {
      "_id": "6613301a9aa2fff663961bb7",
      "body": "My post body",
      "author": "661317987d7001565d5f13c8",
      "comments": [],
      "likes": [],
      "createdAt": "2024-04-07T23:45:30.874Z",
      "updatedAt": "2024-04-07T23:45:30.874Z",
      "__v": 0
    }
  }
  ```

##

##

##

# Get User Feed

- **URL:** `feed`
- **Method:** `GET`
- **Authentication:** Required (JWT token)
- **Description:** Get user personalised feed of posts.
- **Request Body:**

  ```json
  {}
  ```

  - **Response Status: 200 Ok**
  - **Response Body:**

  ```json
    {
            "_id": "66132e0ac2f806d1f19d8e90",
            "body": "My post body",
            "author": "661310d6705725fc87d1c904",
            "comments": [
                {
                    "_id": "66132e2ec2f806d1f19d8e9f",
                    "body": "My Comment body1",
                    "author": "661317c48f69a720b83c8497",
                    "likes": [],
                    "createdAt": "2024-04-07T23:37:18.952Z",
                    "updatedAt": "2024-04-07T23:37:18.952Z",
                    "__v": 0
                },
                {
                    "_id": "66132e6509400a99e83a7726",
                    "body": "My Comment body1",
                    "author": "661317c48f69a720b83c8497",
                    "likes": [],
                    "createdAt": "2024-04-07T23:38:13.239Z",
                    "updatedAt": "2024-04-07T23:38:13.239Z",
                    "__v": 0
                }
            ],
            "likes": [
                {
                    "_id": "661317c48f69a720b83c8497",
                    "fullName": "Muhammad",
                    "userName": "mgiwa",
                    "password": "9ccb627cc2cf710b728852ae10bb2ac647e05ba35971c57d7e85d5f9ef6b7f3c281ff2b41d78e0ca955ee65476d459dcf028919d3ac080f08ec7a6f4ebf0e9df.5bbee3ec13ebc83a",
                    "email": "mgiwa77@gmail.com",
                    "followers": [],
                    "createdAt": "2024-04-07T22:01:40.821Z",
                    "updatedAt": "2024-04-07T22:33:41.443Z",
                    "__v": 0
                }
            ],
            "createdAt": "2024-04-07T23:36:42.204Z",
            "updatedAt": "2024-04-07T23:38:13.252Z",
            "__v": 0
        }[]
  ```

##

##

## Likes and Comments

##

# Like Post

- **URL:** `posts/:postId/like-post`
- **Method:** `POST`
- **Authentication:** Required (JWT token)
- **Description:** Like a post.
- **Response:**
  - Status: `200 OK`
  - Body:
    ```json
    {
      "status": "success",
      "data": {
        "_id": "6613140cb13d6ad192faad06",
        "body": "My post body",
        "author": "661310d6705725fc87d1c904",
        "likes": ["661310d6705725fc87d1c904"],
        "__v": 0,
        "comments": [
          "66131ad3e34b69749f4b4e66",
          "66131ad9e34b69749f4b4e6c",
          "66132e7709400a99e83a7731"
        ],
        "updatedAt": "2024-04-07T23:51:04.658Z"
      }
    }
    ```

##

##

##

# Comment on Post

##

- **URL:** `comments/:postId`
- **Method:** `POST`
- **Authentication:** Required (JWT token)
- **Description:** Add a comment to a post.
- **Request Body:**

  ```json
  {
    "body": "My Comment body1"
  }
  ```

- **Response Status: 200 Ok**
- **Response Body:**

```json
{
  "status": "success",
  "data": {
    "body": "My Comment body1",
    "author": "661317987d7001565d5f13c8",
    "likes": [],
    "_id": "661331db9aa2fff663961bd3",
    "createdAt": "2024-04-07T23:52:59.260Z",
    "updatedAt": "2024-04-07T23:52:59.260Z",
    "__v": 0
  }
}
```

##

##

##

# Get Notifications

- **URL:** `notifications`
- **Method:** `GET`
- **Authentication:** Required (JWT token)
- **Description:** Get all user notifications.
  - **Response Status: 200 Ok**
  - **Response Body:**
  ```json
  {
    "_id": "66132e8509400a99e83a773e",
    "title": "Like Notification",
    "body": "Your Comment has recieved a new like by mgiwa",
    "user": "661310d6705725fc87d1c904",
    "createdAt": "2024-04-07T23:38:45.775Z",
    "updatedAt": "2024-04-07T23:38:45.775Z",
    "__v": 0
  }[]
  ```

# Conclusion

##

This README provides an overview of the project, setup instructions, and documentation for API endpoints, including their functionalities, expected request/response formats, and authentication requirements.

```

```
