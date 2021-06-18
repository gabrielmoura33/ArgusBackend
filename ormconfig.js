module.exports = [
  {
    name: 'default',
    url: process.env.DATABASE_URL,
    // ssl: process.env.NODE_ENV !== 'development' ?  true : false,
    // extra: process.env.NODE_ENV !== 'development' ? {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // } : {},
    type: 'postgres',
    logging: false,
    entities: [
      './src/modules/**/infra/typeorm/entities/*.ts'
    ],
    migrations: [
      'src/shared/infra/typeorm/migrations/*.ts'
    ],
    cli: {
      migrationsDir: 'src/shared/infra/typeorm/migrations'
    },
    seeds: ["src/shared/infra/typeorm/seeds/*{.ts,.js}"]
  },
    {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGODB_HOST,
    port: 27017,
    database: process.env.MONGODB_DATABASE,
    entities: [
      './src/modules/**/infra/typeorm/schemas/*.ts'
    ],
    useUnifiedTopology: true
  }
]
