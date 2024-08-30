import Joi from "joi"
import { UserCreate } from "../src/models/users"
import { StoreCreate } from "../src/models/stores"

export function validateStore(store: StoreCreate) {

    const JoiSchema = Joi.object({
        email: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required().min(10).max(15),
        cnpj: Joi.string().required().min(14).max(14),
        active: Joi.boolean().optional().default(true),
        address_cep: Joi.string().required(),
        address_uf: Joi.string().required(),
        address_city: Joi.string().required(),
        address_neighborhood: Joi.string().required(),
        address_street: Joi.string().required(), 
        address_number: Joi.string().optional(),
    })

    
	return JoiSchema.validate(store)
}