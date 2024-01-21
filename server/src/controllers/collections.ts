import express from 'express'
import {
	createCollection,
	getCollectionById,
	getCollections,
} from '../db/collections'
import { createItem } from '../db/items'
import { getUserById } from '../db/users'
import { getCategoryById } from '../db/categories'

export const getAllCollections = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const collections = await getCollections()
		return res.status(200).json(collections)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params

		const collection = await getCollectionById(id)

		return res.status(200).json(collection)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const addCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const {
			name,
			description,
			imageUrl,
			user,
			category,
			customFields,
			isClosed = false,
		} = req.body

		if (!name || !description || !user || !category)
			return res.status(400).json('Fields are required')

		const owner = await getUserById(user.id)
		if (!owner) return res.status(403).json('No such user')
		const cat = await getCategoryById(category.id)
		if (!cat) return res.status(403).json('No such category')

		const newCollection = await createCollection({
			name,
			description,
			imageUrl,
			user: owner._id,
			category: cat._id,
			customFields,
			isClosed,
		})

		owner.collections.push(newCollection._id)
		await owner.save()
		return res.status(200).json(newCollection).end()
	} catch (error) {
		console.log(error)
		return res
			.status(400)
			.json(error.message + ' or collection with this name already exists')
	}
}

export const addItemToCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		const { name, description, imageUrl, user, tags, customFields } = req.body

		if (!name || !description || !imageUrl || !user || !tags || !customFields)
			return res.status(403).json('Some fields are empty or invalid')

		//TODO: add new tags и потом им этот итем засунуть
		//const newTags = await addAdditionalTags(tags)

		const collection = await getCollectionById(id)
		if (!collection) return res.status(403).json(`The collection doesn't exist`)

		const owner = await getUserById(user.id)
		if (!owner) return res.status(403).json('No such user')

		const newItem = await createItem({
			name,
			description,
			imageUrl,
			user,
			tags,
			customFields,
			collection: collection._id,
		})

		collection.items.push(newItem._id)
		await collection.save()
		owner.items.push(newItem._id)
		await owner.save()

		return res.status(200).json(newItem).end()
	} catch (error) {
		console.log(error.message)
		return res.status(400).json('I think its because of tags')
	}
}

export const updateCollection = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		const { name, description, imageUrl, category, customFields } = req.body
		if (!name || !description || !category)
			return res.status(400).json('Fields are required')
		const collection = await getCollectionById(id)
		if (!collection) return res.status(403).json(`The collection doesn't exist`)
		collection.name = name
		collection.description = description
		collection.imageUrl = imageUrl
		collection.category = category
		collection.customFields = customFields
		await collection.save()
		return res.status(200).json(collection).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
