import Joi from "joi"
import { PromotionCreate } from "../src/models/promotions"

export function validatePromotion(promotion: PromotionCreate) {
	const JoiSchema = Joi.object({
		name: Joi.string().required(),
		awardId: Joi.number().required(),
		active: Joi.boolean().optional(),
		points: Joi.number().required(),
		storeId: Joi.number().required(),
		maxWinners: Joi.number().required()
	})
	return JoiSchema.validate(promotion)
}

export function validateUpdatePromotion(promotion: PromotionCreate) {
	const JoiSchema = Joi.object({
		id: Joi.number().required(),
		name: Joi.string().required(),
		awardId: Joi.number().required(),
		active: Joi.boolean().optional(),
		points: Joi.number().required(),
		storeId: Joi.number().required()
	})
	return JoiSchema.validate(promotion)
}