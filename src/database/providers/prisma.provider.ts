import { DynamicModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

export function createPrismaProvider(): DynamicModule {
  return {
    module: PrismaModule,
  };
}
