import { Resolver, Mutation, Arg, Field, ArgsType, Args } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../entity/user';

@ArgsType()
class NewUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async signUp(@Args() { name, email, password }: NewUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }

  @Mutation(() => String, { nullable: true })
  async login(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    return 'Login successfully';
  }
}
