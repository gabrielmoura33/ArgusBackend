module.exports = [
  {
    name: 'default',
    url: process.env.DATABASE_URL,

    type: 'postgres',
    logging: true,
    entities:
      process.env.NODE_ENVIRONMENT === 'development'
        ? ['./src/modules/**/infra/typeorm/entities/*.ts']
        : ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations:
      process.env.NODE_ENVIRONMENT === 'development'
        ? ['src/shared/infra/typeorm/migrations/*.ts']
        : ['dist/shared/infra/typeorm/migrations/*.js'],
    cli: {
      migrationsDir:
        process.env.NODE_ENVIRONMENT === 'development'
          ? 'src/shared/infra/typeorm/migrations'
          : 'dist/shared/infra/typeorm/migrations',
    },
    seeds:
      process.env.NODE_ENVIRONMENT === 'development'
        ? ['dist/shared/infra/typeorm/seeds/*{.ts,.js}']
        : ['src/shared/infra/typeorm/seeds/*{.ts,.js}'],
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGODB_HOST,
    port: 27017,
    database: process.env.MONGODB_DATABASE,
    entities:
      process.env.NODE_ENVIRONMENT === 'development'
        ? ['./src/modules/**/infra/typeorm/schemas/*.ts']
        : ['./dist/modules/**/infra/typeorm/schemas/*.js'],
    useUnifiedTopology: true,
  },
];
