import Joi from "joi"
import { AwardCreate } from "../src/models/awards"

export function validateAward(award: AwardCreate) {
	const JoiSchema = Joi.object({
		name: Joi.string(),
		price: Joi.number().required().allow("", 0),
		active: Joi.boolean().optional(),
		image_url: Joi.string().optional(),
	})
	return JoiSchema.validate(award)
}