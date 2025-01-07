import Joi from "joi"
import { AwardCreate } from "../src/models/awards"
import { LauncherPoints } from "../src/models/launcherPoints"

export function validateLauncherByCpf(launcher: LauncherPoints) {
	const JoiSchema = Joi.object({
		cpf: Joi.string().required(),
		promotionId: Joi.number().required()
	})
	return JoiSchema.validate(launcher)
}


