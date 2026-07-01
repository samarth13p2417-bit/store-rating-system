# Store Rating Web Application - API Documentation

Base URL: `http://localhost:5000/api`

## Authentication API

### Register User
* **URL:** `/auth/register`
* **Method:** `POST`
* **Auth Required:** No
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "name": "Alice Johnson Normal User",
  "email": "alice@user.com",
  "password": "User@1234",
  "address": "111 Residential Road, Suburb Area, State 89012"
}
```
* **Success Response:**
  * **Code:** 201 Created
  * **Content:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 5,
    "name": "Alice Johnson Normal User",
    "email": "alice@user.com",
    "address": "111 Residential Road, Suburb Area, State 89012",
    "role": "USER",
    "createdAt": "2026-07-01T07:41:00.000Z",
    "updatedAt": "2026-07-01T07:41:00.000Z"
  }
}
```

---

### Login User
* **URL:** `/auth/login`
* **Method:** `POST`
* **Auth Required:** No
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "email": "alice@user.com",
  "password": "User@1234"
}
```
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 5,
      "name": "Alice Johnson Normal User",
      "email": "alice@user.com",
      "address": "111 Residential Road, Suburb Area, State 89012",
      "role": "USER",
      "createdAt": "2026-07-01T07:41:00.000Z",
      "updatedAt": "2026-07-01T07:41:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Logout User
* **URL:** `/auth/logout`
* **Method:** `POST`
* **Auth Required:** No
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Change Password
* **URL:** `/auth/change-password`
* **Method:** `PUT`
* **Auth Required:** Yes
* **Headers:** `Authorization: Bearer <token>`
* **Request Body:**
```json
{
  "currentPassword": "User@1234",
  "newPassword": "User@5678",
  "confirmPassword": "User@5678"
}
```
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Admin API

All endpoints require authorization header with a token belonging to a user with the `ADMIN` role.

### Admin Dashboard Stats
* **URL:** `/admin/dashboard`
* **Method:** `GET`
* **Auth Required:** Yes (Role: ADMIN)
* **Headers:** `Authorization: Bearer <token>`
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Dashboard statistics fetched successfully",
  "data": {
    "totalUsers": 8,
    "totalStores": 3,
    "totalRatings": 11
  }
}
```

---

### Create User
* **URL:** `/admin/users`
* **Method:** `POST`
* **Auth Required:** Yes (Role: ADMIN)
* **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body:**
```json
{
  "name": "Sarah Miller Store Owner",
  "email": "sarahowner@storerating.com",
  "password": "Owner@1234",
  "address": "777 Market Street, Shop Center, State 77777",
  "role": "OWNER"
}
```
* **Success Response:**
  * **Code:** 201 Created
  * **Content:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 9,
    "name": "Sarah Miller Store Owner",
    "email": "sarahowner@storerating.com",
    "address": "777 Market Street, Shop Center, State 77777",
    "role": "OWNER",
    "createdAt": "2026-07-01T07:45:00.000Z",
    "updatedAt": "2026-07-01T07:45:00.000Z"
  }
}
```

---

### Get All Users
* **URL:** `/admin/users`
* **Method:** `GET`
* **Auth Required:** Yes (Role: ADMIN)
* **Headers:** `Authorization: Bearer <token>`
* **Query Parameters:**
  * `search` (Optional) - Filter by name, email, address, or role
  * `sortBy` (Optional) - Field to sort by: `name`, `email`, `address`, `role` (Default: `name`)
  * `sortOrder` (Optional) - Sort direction: `asc` or `desc` (Default: `asc`)
  * `page` (Optional) - Page number (Default: `1`)
  * `limit` (Optional) - Number of items per page (Default: `10`)
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "id": 2,
      "name": "Robert Store Owner One",
      "email": "owner1@storerating.com",
      "address": "456 Owner Avenue, Business District, State 23456",
      "role": "OWNER",
      "createdAt": "2026-07-01T07:40:00.000Z",
      "updatedAt": "2026-07-01T07:40:00.000Z",
      "averageRating": 4.5
    }
  ],
  "pagination": {
    "total": 8,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### Get User Details
* **URL:** `/admin/users/:id`
* **Method:** `GET`
* **Auth Required:** Yes (Role: ADMIN)
* **Headers:** `Authorization: Bearer <token>`
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "User details fetched successfully",
  "data": {
    "id": 2,
    "name": "Robert Store Owner One",
    "email": "owner1@storerating.com",
    "address": "456 Owner Avenue, Business District, State 23456",
    "role": "OWNER",
    "createdAt": "2026-07-01T07:40:00.000Z",
    "updatedAt": "2026-07-01T07:40:00.000Z",
    "store": {
      "id": 1,
      "name": "Sunrise Electronics Store",
      "email": "sunrise@store.com",
      "address": "100 Tech Park Drive, Silicon Valley, State 56789"
    }
  }
}
```

---

### Create Store
* **URL:** `/admin/stores`
* **Method:** `POST`
* **Auth Required:** Yes (Role: ADMIN)
* **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body:**
```json
{
  "name": "Sunshine Books and Coffee Store",
  "email": "sunshinebooks@store.com",
  "address": "999 University Avenue, Campus Town, State 99999",
  "ownerId": 2
}
```
* **Success Response:**
  * **Code:** 201 Created
  * **Content:**
```json
{
  "success": true,
  "message": "Store created successfully",
  "data": {
    "id": 4,
    "name": "Sunshine Books and Coffee Store",
    "email": "sunshinebooks@store.com",
    "address": "999 University Avenue, Campus Town, State 99999",
    "ownerId": 2,
    "createdAt": "2026-07-01T07:46:00.000Z",
    "updatedAt": "2026-07-01T07:46:00.000Z"
  }
}
```

---

### Get All Stores (Admin)
* **URL:** `/admin/stores`
* **Method:** `GET`
* **Auth Required:** Yes (Role: ADMIN)
* **Headers:** `Authorization: Bearer <token>`
* **Query Parameters:**
  * `search` (Optional) - Filter by name, email, or address
  * `sortBy` (Optional) - Field to sort by: `name`, `email`, `address` (Default: `name`)
  * `sortOrder` (Optional) - Sort direction: `asc` or `desc` (Default: `asc`)
  * `page` (Optional) - Page number (Default: `1`)
  * `limit` (Optional) - Number of items per page (Default: `10`)
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Stores fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Sunrise Electronics Store",
      "email": "sunrise@store.com",
      "address": "100 Tech Park Drive, Silicon Valley, State 56789",
      "ownerId": 2,
      "createdAt": "2026-07-01T07:40:00.000Z",
      "updatedAt": "2026-07-01T07:40:00.000Z",
      "owner": {
        "name": "Robert Store Owner One"
      },
      "averageRating": 4.5
    }
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

## User API

### Get Stores Listing
* **URL:** `/stores`
* **Method:** `GET`
* **Auth Required:** Yes (Role: USER)
* **Headers:** `Authorization: Bearer <token>`
* **Query Parameters:**
  * `search` (Optional) - Filter by store name or address
  * `sortBy` (Optional) - Field to sort by: `name`, `address` (Default: `name`)
  * `sortOrder` (Optional) - Sort direction: `asc` or `desc` (Default: `asc`)
  * `page` (Optional) - Page number (Default: `1`)
  * `limit` (Optional) - Number of items per page (Default: `10`)
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Stores fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Sunrise Electronics Store",
      "email": "sunrise@store.com",
      "address": "100 Tech Park Drive, Silicon Valley, State 56789",
      "createdAt": "2026-07-01T07:40:00.000Z",
      "updatedAt": "2026-07-01T07:40:00.000Z",
      "averageRating": 4.5,
      "userRating": {
        "id": 1,
        "rating": 5
      }
    }
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

### Submit Rating
* **URL:** `/ratings`
* **Method:** `POST`
* **Auth Required:** Yes (Role: USER)
* **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body:**
```json
{
  "storeId": 2,
  "rating": 4
}
```
* **Success Response:**
  * **Code:** 201 Created
  * **Content:**
```json
{
  "success": true,
  "message": "Rating submitted successfully",
  "data": {
    "id": 12,
    "rating": 4,
    "userId": 5,
    "storeId": 2,
    "createdAt": "2026-07-01T07:47:00.000Z",
    "updatedAt": "2026-07-01T07:47:00.000Z"
  }
}
```

---

### Update Rating
* **URL:** `/ratings/:id`
* **Method:** `PUT`
* **Auth Required:** Yes (Role: USER)
* **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body:**
```json
{
  "rating": 5
}
```
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Rating updated successfully",
  "data": {
    "id": 12,
    "rating": 5,
    "userId": 5,
    "storeId": 2,
    "createdAt": "2026-07-01T07:47:00.000Z",
    "updatedAt": "2026-07-01T07:47:30.000Z"
  }
}
```

---

## Store Owner API

### Owner Dashboard Stats & Details
* **URL:** `/owner/dashboard`
* **Method:** `GET`
* **Auth Required:** Yes (Role: OWNER)
* **Headers:** `Authorization: Bearer <token>`
* **Success Response:**
  * **Code:** 200 OK
  * **Content:**
```json
{
  "success": true,
  "message": "Owner dashboard data fetched successfully",
  "data": {
    "store": {
      "id": 1,
      "name": "Sunrise Electronics Store",
      "email": "sunrise@store.com",
      "address": "100 Tech Park Drive, Silicon Valley, State 56789"
    },
    "averageRating": 4.5,
    "ratings": [
      {
        "id": 1,
        "rating": 5,
        "createdAt": "2026-07-01T07:42:00.000Z",
        "user": {
          "name": "Alice Johnson Normal User",
          "email": "alice@user.com"
        }
      },
      {
        "id": 2,
        "rating": 4,
        "createdAt": "2026-07-01T07:42:15.000Z",
        "user": {
          "name": "Bob Williams Normal User Two",
          "email": "bob@user.com"
        }
      }
    ]
  }
}
```
