const blogRouter = require("express").Router()
const Blog = require("../models/blogs")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

//Login token
const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
	  return authorization.substring(7)
	}
	return null
  }

//Get all users
blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({})
		.populate("user", {username: 1,name: 1,id: 1})
	response.json(blogs.map(blog => blog.toJSON()))
})


//Add new Blog
blogRouter.post("/", async (request, response, next) => {
	const body = request.body
	const token = getTokenFrom(request)

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		  }

		  const user = await User.findById(decodedToken.id)

			const blog = new Blog({
				title: body.title,
				author: body.author,
				url: body.url,
				likes: body.likes === undefined ? 0 : body.likes,
				user: user.id
			})		
				
			const savedBlog = await blog.save()
			response.json(savedBlog.toJSON())
			} catch(exception) {
			next(exception)
		}	
})

//Delete a Blog
blogRouter.delete("/:id", async (request, response, next) => {
	const body = request.body
	const token = getTokenFrom(request)

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		  }

		const user = await User.findOne({ username: decodedToken.username })
		const blog = await Blog.findById(request.params.id)

		if (blog.user.toString() === user.id.toString()) {
			await Blog.findByIdAndRemove(request.params.id)
			response.status(204).end()
		} else {
			response.status(401).end()
		}
	} catch(exception) {
		next(exception)
	}	
})

module.exports = blogRouter

