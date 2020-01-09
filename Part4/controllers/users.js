const usersRouter = require("express").Router()
const User = require('../models/user')
const Blog = require("../models/blogs")
const bcryptjs = require('bcryptjs')
usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
				.populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
	response.json(users.map(user => user.toJSON()))
})

//New User
usersRouter.post('/', async (request, response, next) => {
	const body = request.body
	if (body.password && body.password.length > 2) {
		try {
			const saltRounds = 10
			const passwordHash = await bcryptjs.hash(body.password, saltRounds)
			const user = new User({
				username: body.username,
				name: body.name,
				passwordHash: passwordHash,
			})

			const result = await user.save()
			response.status(201).json(result)
		} catch (exception) {
			next(exception)
		}
	} else {
		response.status(400).json({ error: 'Password is too short or missing (minimum characters 3)!' })
	}
})

module.exports = usersRouter