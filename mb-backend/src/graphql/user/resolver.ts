import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class UserResolver {
  constructor(private readonly prismaService: PrismaService) {}
}