import Joi from "joi"
import { AwardCreate } from "../src/models/awards"

export function validateAward(award: AwardCreate) {
	const JoiSchema = Joi.object({
		name: Joi.string().required(),
		price: Joi.number().required(),
		active: Joi.boolean().optional(),
		image_url: Joi.string().optional().allow(""),
		storeId: Joi.number().required()
	})
	return JoiSchema.validate(award)
}