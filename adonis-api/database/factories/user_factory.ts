import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { PostFactory } from './post_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('posts', () => PostFactory)
  .build()
