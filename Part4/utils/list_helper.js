const dummy = (blogs) => {
	return 1
}


const totalLikes = (blogs) => {
	const reducer = (sum, item) => sum + item.likes
	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)
}




//Favorite Blog
const favoriteBlog = (blogs) => {
	const reducer = (prev, current) => prev === null
		? current : (prev.likes > current.likes)
			? prev : current
	const favorite = blogs.length === 0
		? null : blogs.reduce(reducer, null)
	if (favorite !== null) {
		const returnedObject = {
			title: favorite.title,
			author: favorite.author,
			likes: favorite.likes
		}
		return returnedObject
	} else {
		return null
	}
}


//Most Blogs
const mostBlogs = (blogs) => {
	const _ = require('lodash')

	const groupedByAuthor = _.groupBy(blogs, 'author')
	const authorList = []
	_.each(groupedByAuthor, (value, key) => {
		const authorObject = {
			author: key,
			blogs: Object.keys(value).length
		}
		authorList.push(authorObject)
	})

	authorList.sort((a, b) => b.blogs - a.blogs)
	const mostActiveAuthor = authorList.shift()

	return blogs.length === 0
		? null
		: mostActiveAuthor
}

const mostLikes = (blogs) => {
	const _ = require('lodash')

	const groupedByAuthor = _.groupBy(blogs, 'author')
	const authorList = []
	_.each(groupedByAuthor, (value, key) => {
		const likes = _.sumBy(value, 'likes')
		const authorObject = {
			author: key,
			likes: likes
		}
		authorList.push(authorObject)
	})

	authorList.sort((a, b) => b.likes - a.likes)

	const bestLikedAuthor = authorList.shift()

	return blogs.length === 0
		? null
		: bestLikedAuthor
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}