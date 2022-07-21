# :notebook_with_decorative_cover: Customers API

Save contact informations of you customers.

## Implemented features

- See a list with all your customers contact
- Add a new contact
- Edit a contact
- Delete a contact
- Search for a customer by it's name

## Technologies

<p>
  <img src='https://img.shields.io/badge/Node.js-007ACC?style=for-the-badge&logo=nodedotjs&logoColor=white' alt='NodeJS' />
  <img src='https://img.shields.io/badge/Express.js-007ACC?style=for-the-badge&logo=express&logoColor=white' alt='Express'/>
  <img src='https://img.shields.io/badge/MongoDB-007ACC?style=for-the-badge&logo=mongodb&logoColor=white' alt='MongoDB'>
  <img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' alt='TypeScript' />
  <img src='https://img.shields.io/badge/Jest-007ACC?style=for-the-badge&logo=jest&logoColor=white' alt='Jest'/>
</p>

## How to run project

1. Clone this repository

```bash
git@github.com:acolima/customers-api.git
```

2. Go to the project directory

```bash
 cd customers-api
```

3. Install dependencies

```bash
npm i
```

4. You need to have mongo installed and running

5. Create a `.env.development` file with the same structure of `.env.example` and change the values of the enviroment variables

```bash
MONGO_URI=
PORT=
DATABASE_NAME=
```

6. Run project with

```bash
npm run dev
```

## How to run the tests

1. Create a `.env.test` file with the same structure of `.env.example` and change the values of the enviroment variables

```bash
MONGO_URI=
PORT=
DATABASE_NAME=
```

2. Run tests with

```bash
npm run test
```

3. Run coverage tests with

```bash
npm run test:coverage
```

:star: You can check the front-end repository of this project at <a href='https://github.com/acolima/customers' target='_blank'>Customers</a> and follow the instructions to run

:star: API documentation can be found at the `Wiki` tab or <a href='https://github.com/acolima/customers-api/wiki' target='_blank'>here</a>

## Author

<img src='https://avatars.githubusercontent.com/acolima' width='150px'/>

<p>
  <a href='https://github.com/acolima'>
    <img src='https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white' alt='Github' />
  </a>
  <a href='https://www.linkedin.com/in/ana-caroline-oliveira-lima-51821122b/'>
    <img src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' alt='LinkedIn' />
  </a>
  <a href='mailto:acolima@gmail.com'>
    <img src='https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white' alt='Gmail' />
  </a>
</p>
