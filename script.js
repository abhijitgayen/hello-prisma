const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // for create user
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'lovly',
  //     email: 'lovly@prisma.io',
  //   },
  // })
  // console.log(user)

  // read user
  // const users = await prisma.user.findMany()
  // console.log(users)

  // Explore relation queries
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@prisma.io',
      posts: {
        create: [
          {
            title: 'Hello World',
            published: true
          },
          {
            title: 'My second post',
            content: 'This is still a draft'
          }
        ],
      },
    },
  })
  console.log(user)

  // get users with post
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })