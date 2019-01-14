const Query = {

  comments(parent, args, {db}, info) {
    if(!args.query) {
      return db.comments
    }
    return db.comments.filter((comment) => {
      return comment.text.toLowerCase().includes(args.data.query.toLowerCase())
    })
  },
  users(parent, args, {db}, info){
    if(!args.query){
      return db.users
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.data.query.toLowerCase())
    })
  },
  book(parent, args, { db }, info) {
    if(!args.query){
    return db.posts
    }
    return db.posts.filter((post) => {
      return post.title.toLowerCase().includes(args.data.query.toLowerCase())
    })
  },
}

export default Query