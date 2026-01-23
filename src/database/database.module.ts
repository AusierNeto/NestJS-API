import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'nestuser',
		password: '12345',
		database: 'taskdb',
		autoLoadEntities: true,
		synchronize: true,
	})]
})
export class DatabaseModule {}
