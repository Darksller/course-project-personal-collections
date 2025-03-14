import { validateEmail } from '../helpers'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, select: true },
	email: {
		type: String,
		required: true,
		unique: true,
		select: true,
		validate: [validateEmail, 'Please fill a valid email address'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},
	role: { type: String, required: true, default: 'default_user', select: true },
	likedCollections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PersonalCollection',
			required: true,
			select: true,
		},
	],
	likedComments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
			required: true,
			select: true,
		},
	],
	likedItems: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
			required: true,
			select: true,
		},
	],
	collections: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PersonalCollection',
			required: true,
			select: true,
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
			required: true,
			select: true,
		},
	],
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
			required: true,
			select: true,
		},
	],
	authentication: {
		password: { type: String, required: false, select: false },
		salt: { type: String, select: false },
		refreshToken: { type: String, select: false },
		isBanned: { type: Boolean, required: true, default: false, select: false },
	},
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () =>
	UserModel.find()
		.populate('items')
		.populate('collections')
		.populate('likedItems')
		.populate('likedCollections')
export const getUserByEmail = (email: string) =>
	UserModel.findOne({ email })
		.populate('items')
		.populate('collections')
		.populate('likedItems')
		.populate('likedCollections')
export const getUserByRefreshToken = (refreshToken: string) =>
	UserModel.findOne({ 'authentication.refreshToken': refreshToken })
		.populate('items')
		.populate('collections')
		.populate('likedItems')
		.populate('likedCollections')
export const getUserById = (id: string) =>
	UserModel.findById(id)
		.populate('items')
		.populate('collections')
		.populate('likedItems')
		.populate('likedCollections')
export const createUser = (values: Record<string, any>) =>
	new UserModel(values).save().then(user => user.toObject())
export const deleteUserById = (id: string) =>
	UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) =>
	UserModel.findByIdAndUpdate(id, values)

export const findOwnByCollectionId = (id: string) =>
	UserModel.findOne({
		collections: id,
	})

export const findLikedByCollectionId = (id: string) =>
	UserModel.findOne({
		likedCollections: id,
	})

export const findOwnItemsByCollectionId = (id: string) =>
	UserModel.findOne({
		items: id,
	})

export const findLikedItemsByCollectionId = (id: string) =>
	UserModel.findOne({
		likedItems: id,
	})
