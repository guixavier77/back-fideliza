import Joi from "joi"
import { PromotionCreate } from "../src/models/promotions"

export function validatePromotion(promotion: PromotionCreate) {
	const JoiSchema = Joi.object({
		name: Joi.string().required(),
		awardId: Joi.number().required(),
		active: Joi.boolean().optional(),
		points: Joi.number().required(),
		storeId: Joi.number().required()
	})
	return JoiSchema.validate(promotion)
}