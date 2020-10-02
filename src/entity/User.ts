import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  // OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Recipe } from './recipe';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  // @Field(() => [Recipe])
  // @OneToMany(() => Recipe, (recipe) => recipe.user)
  // recipes: Recipe[];

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
