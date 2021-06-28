module.exports = [
  {
    name: 'default',
    url: process.env.DATABASE_URL,

    type: 'postgres',
    logging: false,
    entities: [
      './dist/modules/**/infra/typeorm/entities/*.js'
    ],
    migrations: [
      'dist/shared/infra/typeorm/migrations/*.js'
    ],
    cli: {
      migrationsDir: 'dist/shared/infra/typeorm/migrations'
    },
    seeds: ["dist/shared/infra/typeorm/seeds/*{.ts,.js}"]
  },
    {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGODB_HOST,
    port: 27017,
    database: process.env.MONGODB_DATABASE,
    entities: [
      './dist/modules/**/infra/typeorm/schemas/*.js'
    ],
    useUnifiedTopology: true
  }
]
