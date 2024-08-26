import Joi from "joi"
import { UserCreate } from "../src/models/users"

export function validateUser(user: UserCreate) {

    const JoiSchema = Joi.object({
        cpf: Joi.string().min(11).max(11),
        email: Joi.string().required(),
        password: Joi.string().required(),
        birthDate: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required().min(10).max(15),
        sex: Joi.string().required().valid("m", "f", "i"),
        active: Joi.boolean().required(),
        role: Joi.string().required().valid("superAdmin","admin", "customer", "operator"),
        storeId: Joi.number().optional().allow("", null)
    })

    
	return JoiSchema.validate(user)
}