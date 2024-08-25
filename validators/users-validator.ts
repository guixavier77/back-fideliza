import Joi from "joi"
import { UserCreate } from "../src/models/users"

export function validateUsers(user: UserCreate) {

    const JoiSchema = Joi.object({
        cpf: Joi.string().min(11).max(11),
        email: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required().min(10).max(15),
        sexo: Joi.string().required(),
        active: Joi.boolean().required(),
        role: Joi.string().required().valid("admin", "customer", "operator"),
        storeId: Joi.string().optional()
    })

    
	return JoiSchema.validate(user)
}