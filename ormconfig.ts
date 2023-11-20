
export  const ormConfig:any= {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: '1234',
  database: 'nest_crud',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
}
  