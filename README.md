\# CodeAlpha Tasks



MERN stack projects built as part of the CodeAlpha internship program.



\## Task 1: E-Commerce Store

A full-stack e-commerce web app with product listings, product details, cart, and JWT-based authentication.



\*\*Tech stack:\*\* React, Vite, Tailwind CSS, Node.js, Express, MongoDB



\*\*Features:\*\*

\- User register/login with JWT (httpOnly cookie)

\- Product listing and detail pages

\- Add product (authenticated users)

\- Cart with add/view functionality (persisted per user)



📁 \[`Task1\_ECommerce`](./Task1\_ECommerce)



\## Task 2: Social Media App

A social app with posts, likes, and a follow/following system.



\*\*Tech stack:\*\* React, Vite, Node.js, Express, MongoDB



\*\*Features:\*\*

\- User register/login with JWT

\- Create, view, and delete posts

\- Like posts

\- Follow/unfollow users

\- Following feed (posts from followed users)



📁 \[`Task2\_SocialApp`](./Task2\_SocialApp)







\### Setup (for any task)

Each task folder has its own `client`/`frontend` and `server`/`backend` subfolders. To run:



```bash

cd Task1\_ECommerce/server   # or backend

npm install

npm run dev



cd ../client   # or frontend

npm install

npm run dev

```



You'll need a `.env` file in each server folder with your own MongoDB URI and JWT secret (not included in this repo).

