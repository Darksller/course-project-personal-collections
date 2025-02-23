import mongoose from 'mongoose'
import { TagModel } from './tags'
import { UserModel } from './users'
import { CommentModel } from './comments'

const CollectionSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	imageUrl: { type: String },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	creationDate: { type: Date, required: true },
	isClosed: { type: Boolean, required: true },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	customFields: [
		{
			fieldName: { type: String, required: true },
			fieldType: { type: mongoose.Schema.Types.Mixed, required: true },
		},
	],
	likeCount: { type: Number, required: true, default: 0 },
	items: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
	],
}).index(
	{ name: 'text', description: 'text', 'customFields.fieldName': 'text' },
	{ name: 'index' }
)

export const PersonalCollectionModel = mongoose.model(
	'PersonalCollection',
	CollectionSchema
)

export const getCollections = () =>
	PersonalCollectionModel.find()
		.populate('user')
		.populate('category')
		.populate('items')

export const getCollectionById = (id: string) =>
	PersonalCollectionModel.findById(id)
		.populate('user')
		.populate('category')
		.populate({
			path: 'items',
			populate: [
				{ path: 'tags', model: TagModel },
				{ path: 'user', model: UserModel },
				{
					path: 'comments',
					model: CommentModel,
					populate: { path: 'user', model: UserModel },
				},
			],
		})
export const createCollection = (values: Record<string, any>) =>
	new PersonalCollectionModel(values)
		.save()
		.then(personalCollection => personalCollection.toObject())

export const updateCollectionById = (id: string, values: Record<string, any>) =>
	PersonalCollectionModel.findByIdAndUpdate(id, values)

export const deleteCollectionById = (id: string) =>
	PersonalCollectionModel.findOneAndDelete({ _id: id })

export const searchC = (text: string) =>
	PersonalCollectionModel.find({ $text: { $search: text } })
		.populate('user')
		.populate('category')
		.populate({
			path: 'items',
			populate: [
				{ path: 'tags', model: TagModel },
				{ path: 'user', model: UserModel },
				{
					path: 'comments',
					model: CommentModel,
					populate: { path: 'user', model: UserModel },
				},
			],
		})
