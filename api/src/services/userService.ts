import prisma from "../utils/prismaClient";
import { Role } from "@prisma/client";

export async function getAllUsers() {
  // return prisma.user.findMany({
  //   include: { articles: true },
  // });
  const allUsers = await prisma.user.findMany({
    include: { articles: true },
  });
  console.log(JSON.stringify(allUsers, null, 2));
}

export async function getUser(id: number) {
  // return prisma.user.findUnique({
  //   where: { id: id },
  // });
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  console.log(user);
}

export async function createUser(
  username: string,
  password: string,
  role: Role,
  articles?: { title: string; body: string }[]
) {
  return prisma.user.create({
    data: {
      username,
      password,
      role,
      articles: articles
        ? {
            create: articles.map((article) => ({
              title: article.body,
              body: article.body,
            })),
          }
        : undefined,
    },
  });
}

// createUser("john", "password123", Role.ADMIN, [
//   {
//     title: "First title",
//     body: "Content of the first article",
//   },
// ]);

getAllUsers();
