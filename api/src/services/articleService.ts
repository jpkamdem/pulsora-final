import prisma from "../utils/prismaClient";

export async function getAllArticles() {
  // return prisma.article.findMany();
  const allArticles = await prisma.article.findMany();
  console.log(allArticles);
}

export async function getArticle(id: number) {
  // return prisma.article.findUnique({
  //   where: { id: id },
  // });
  const article = await prisma.article.findUnique({
    where: { id: id },
  });
  console.log(article);
}

export async function createArticle(
  title: string,
  body: string,
  authorId: number
) {
  await prisma.article.create({
    data: {
      title: title,
      body: body,
      authorId: authorId,
    },
  });
}

createArticle("Second article", "Content of the second article", 1);

getAllArticles();
