const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'Mikon suosikkiblogi',
		author: 'Mikko Saari',
		url: 'https://www.mikkosaari.fi/',
		likes: 100,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 3,
	},
	{
		title: 'Tiinu-Liinun kakkublogi',
		author: 'Tiinu-Liinu',
		url: 'http://www.kakkublogi.example.com/',
		likes: 2,
	}
]

const nonExistingId = async () => {
  const blog = new Note({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}