const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blogs')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

// beforeEach(async () => {
// 	await Blog.deleteMany({})
//   // console.log('cleared')
// 	const blogObjects = helper.initialBlogs
// 		.map(blog => new Blog(blog))
// 	const promiseArray = blogObjects.map(blog => blog.save())
// 	await Promise.all(promiseArray)
// })

describe('Getting all blogs', () => {
	test('Blog API returns correct number of JSON results', async () => {
		const blogs = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('Checking blog posts is named id, not _id', async () => {
		const blogs = await api.get('/api/blogs')
		expect(blogs.body
			.map(b => b.hasOwnProperty('id'))
			.every(p => p === true))
			.toBe(true)
	})
})


describe('Creating new blogs', () => {
	test('A blog can be added', async () => {
		await User.deleteMany({})
		const user = { username: 'admin', password: 'password' }
		await api
			.post('/api/users')
			.send(user)
			.expect(201)

		const loginDetails = {
			username: user.username,
			password: user.password,
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)
			.expect(200)

		const token = login.body.token

		const newBlog = {
			title: 'Test blog',
			author: 'Test Author',
			url: 'http://www.example.com/',
			likes: 4
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAfter = await helper.blogsInDb()

		expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)

		const titles = blogsAfter.map(blog => blog.title)
		expect(titles).toContain(newBlog.title)
	})
	test('Added blog without likes get 0 likes as default', async () => {
		await User.deleteMany({})
		const user = { username: 'admin', password: 'password' }
		await api
			.post('/api/users')
			.send(user)
			.expect(201)

		const loginDetails = {
			username: user.username,
			password: user.password,
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)
			.expect(200)

		const token = login.body.token

		const newBlog = {
			title: 'Test blog',
			author: 'Test author',
			url: 'http://www.example.com/'
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAfter = await helper.blogsInDb()

		const addedBlog = blogsAfter.find(blog => blog.title === newBlog.title)
		expect(addedBlog.likes).toBe(0)
	})

	test('Added blog without title or url gets 400 Bad Request as result', async () => {
		await User.deleteMany({})
		const user = { username: 'admin', password: 'password' }
		await api
			.post('/api/users')
			.send(user)
			.expect(201)

		const loginDetails = {
			username: user.username,
			password: user.password,
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)
			.expect(200)

		const token = login.body.token

		const newBlog = {
			author: 'Test author',
			title: 'Test title for new blog',
			likes: 5
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(400)

		newBlog.url = 'http://www.blog.com/add_new_url/'
		delete newBlog.title

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(400)
	})
})

//Deleting Blog Test
describe('Delete blogs', () => {
	test('Unauthorized deletion of blog  returns 403', async () => {
		const blogsBefore = await helper.blogsInDb()
		const blogToDelete = blogsBefore[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(401)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter.length).toBe(blogsBefore.length)
	})
})

afterAll(() => {
  mongoose.connection.close()
})