# End to End React with Prisma 2

![NewsPrism Logo](./public/end-to-end-react.jpg)

## Learn the fundamentals for building a full-fledged fullstack React application

This is the repo for the course by [Codemochi](https://codemochi.com) called [End to End React with Prisma 2](https://courses.codemochi.com/end-to-end-react-with-prisma-2). We will cover all of the techniques needed to build a fully fledged app- user login, permissions, database management, backend creation. The works!

We will build an entire social RSS reader full stack application from scratch over 10 hours and learn all of the fundamentals of building a professional grade app.

### Overview

Check out the `master` branch to see a step by step guide for building this application from the ground up. Each step is a commit which makes it easy to tell exactly what changed from step to step.

If you just want the finished product, you can clone this repo and the `mater` branch will have the finished version if you pull the latest.

### How to use this Project

If you just want to run the app, check out the latest on the `master` branch and then create a `.env` file in the root of your file.

_.env_

```
DATABASE_URL='postgresql://postgres:postgres@localhost:5432/yourdatabasename'
AUTH0_CLIENTID=xxxx
AUTH0_DOMAIN=yyyy.us.auth0.com
AUTH0_CLIENT_SECRET=zzzzzz
AUTH0_SCOPE='openid profile'
AUTH0_COOKIE='some-really-long-string-has-to-be-at-least-40-characters'
BACKEND_ADDRESS=http://localhost:3000
```

You can get the Auth0 credentials by following the video in step 3. The database will get set up in step 2 when we configure Prisma 2.

You can start the app locally by running `npm run dev`.

### Steps

Create the Backend

1. Create Next.js base
2. Configure Prisma 2 schema
3. Configure Auth0
4. Add graphQL server
5. Add Context and Middleware
6. Add Feed queries and mutations
7. Add Bundle queries and mutations
8. Add Nested Author information
9. Add FeedTag and BundleTag relations
10. Add LikeBundle and LikeFeed Mutations
11. Add Find queries
12. Add Update mutations
13. Add Create Saved Article operations
14. Add Delete mutations
15. Add queries, mutations and fragments

Create the Frontend

16. Add Tailwindcss
17. Add Layout and Navbar
18. Add ItemList component
19. Add OneListItem component
20. Add Badges
21. Create Items and Item Detail pages
22. Start the NewEditItem component
23. Add SearchItems component
24. Finish create item functionality
25. Add update existing item functionality
26. Add delete button
27. Add like button
28. Create the generate article list component
29. Add saved article list component
30. Add one article component
31. Add saved articles page
32. Tidy it all up
