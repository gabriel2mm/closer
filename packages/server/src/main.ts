import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import fastifyCsrfProtection from '@fastify/csrf-protection';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	);
	app.register(helmet)
	app.enableCors({
		origin: "*",
		methods: ["GET,HEAD,OPTIONS,POST,PUT"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"X-CSRF-TOKEN",
			"access-control-allow-methods",
			"Access-Control-Allow-Origin",
			"access-control-allow-credentials",
			"access-control-allow-headers",
		],
		credentials: true,
	});
	app.register(fastifyCsrfProtection)
	await app.listen(8081);
}
bootstrap();