
import uuidv4 from 'uuid/v4';
import { PubSub } from 'graphql-yoga';

const Mutation = {
  createUser(parent, args, { db, pubsub }, info){
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email
    })
    if(emailTaken) {
      throw new Error('Email taken')
    }

    const user = {
      id: uuidv4(),
      ...args

    }
    db.users.push(user)
    return user
  },
  updateUser(parent, args, { db }, info) {
    const {id, data } = args
    const user = db.users.find(user => user.id === id)

    if(!user){
      throw new Error ('user not found')
    }
    if (typeof data.email === 'string'){
      const emailTaken = db.users.some(user => user.email === data.email)
      if(emailTaken){
        throw new Error('Email taken')
      }
      user.email = data.email
    }
    if(typeof data.age !== 'undefined') {
      user.age = data.age
    }
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id)

    if (userIndex === -1) {
      throw new Error ('user not found')
    }
    const deletedUsers = db.users.splice(userIndex, 1);
    posts = db.posts.filter((post) => {
    const match = post.author === args.id
  
    if (match) {
      comments = db.comments.filter((comment) => comment.post !== post.id)
    }
    return match
  })
    comments = db.comments.filter((comment) => comment.author !== args.id)
  },

  deleteComment(parent, args, { db,pubsub }, info ) {
    const commentExists = db.comments.findIndex(comment => comment.id === args.id)

    if(commentExists === -1) {
      throw new Error ('comment not found')
    }
    const [deleteComment] = db.comments.splice(commentExists, 1)
    pubsub.publish(`comment ${deleteComment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deleteComment
      }
    })
    return deleteComment
  },

  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author)

    if (!userExists ) {
      throw new Error('User not found');
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }
    db.posts.push(post)
    pubsub.publish(`post`, {
      post: {
        mutation: 'CREATED',
        data: post
      }
    })
    return post
  }, 

  updatePost(parent, args, { db, pubsub }, info) {
    const post = db.posts.find(post => post.id === args.id)
    const originalPost = { ...post }
    if(!post) {
      throw new Error('post does not exist')
    }
    if(typeof args.data.title === "string"){
        post.title = args.data.title
    }
    if(typeof args.data.body === "string"){
      post.body = args.data.body
    }
    if(typeof args.data.published === "boolean"){
      post.published = args.data.published
    }

    if(originalPost.published && !post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: originalPost
        }
      })
    } else if (!originalPost.published && post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post    
      }
      })

    } else if(post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      })
    }
    return post
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const comment = db.comments.find(comment => comment.id === args.id)
    if(!comment) {
      throw new Error('comment does not exist')
    }
    if(typeof args.data.text === "string"){
        comment.text = args.data.text
    }
    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    })

    return comment
  },

  deletePost (parent, args, { db, pubsub }, info) {
    console.log(db)
    const postExists = db.posts.findIndex(post => post.id === args.id)
    if(postExists === -1) {
    }

    const [post] = db.posts.splice(postExists, 1)

    const comments = db.comments.filter(comment => comment.post !== args.id)
    if(post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post
        }
      })
    }
    return post

  },

  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author)
    const postExists = db.posts.some((post) => post.id === args.data.post)

    if(!userExists || !postExists) {
      throw new Error ('either the post or user does not exist')
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment)
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: "CREATED",
        data: comment
      }
     
    })
    return comment
  }
}

export default Mutation;