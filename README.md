<h1 align="center">
Simple GraphQL API with NestJS in Back-end. React and Apollo Client for Front-end.
</h1>
<h2 align="center">
Based on Code Challenge - NestJS + TypeORM + GraphQL made by Rocketseat
</h2>
<br/>

## Functional Requirements

- [x] User register with e-mail only
- [x] User login with e-mail only
- [x] User need to be able to post messages on the Board (Back-end)
- [ ] User need to be able to post messages on the Board (Front-end)
- [x] (optional) User need to be able to delete messages (Back-end)
- [ ] (optional) User need to be able to delete messages (Front-end)
- [x] New messages can be listed at real time (Back-end)
- [ ] New messages can be listed at real time (Front-end)
- [ ] Add Swagger support
- [ ] DataLoader integration

## Business Rules

- [x] Message can only be deleted by its author

## Non-functional Requirements

- [x] Nest.js
- [x] GraphQL
- [x] TypeORM
- [x] React + Apollo Client (or another library)

## What can be better?

- User ID could be stored at Context API in Front-end;

## Dependencies

- [Node](https://nodejs.org/en/) = 10

## Getting started

1. Clone this repository;<br />
2. Run `npm or yarn install` at each project in order to install dependencies.<br />
3. Run `yarn start:dev` for `back-end` and `yarn start` for `front-end` folder.<br />
4. Access `localhost:3001` in your browser. GraphQL playground: `localhost:3333/graphql`.<br />
