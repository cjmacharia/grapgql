import { Prisma } from'prisma-binding'
import { error } from 'util';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({id: authorId})
  if(!userExists) {
    throw new error("no user found")
  }
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{author {id name email posts { title id } }}')

  return post.author
}

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({
    id: postId
  })

  if (!postExists) {
    throw new Error('post not found')
  }
  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data: {
      ...data
    }
  }, '{author {id name email posts{id title } }}')
  return post.author
}
 

const createNewUser = async (data) => {
  const user = await prisma.mutation.createUSer({
    data: {
      ...data
    }  
  }, '{id name}')
  return user
}

createNewUser({name: "cjmash"}).then(user => console.log(user))
// updatePostForUser("cjqv5i2iz003u0706o3b7gkzq", {title: "I chaged the user navigation"}).then(user => console.log(user)).catch(err => console.log(err))
// createPostForUser('cjqv5hfwh003o07062im4nffa', {
//   title: "async is good for my soul",
//   body: 'I love async',
//   published: true
// }).then((user) => {
//   console.log(user)
// }).catch(err => console.log(err))
