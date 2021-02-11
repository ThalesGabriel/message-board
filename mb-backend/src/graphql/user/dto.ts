import { InputType, ObjectType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => ID)
  readonly id: number;
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly id: number;
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}