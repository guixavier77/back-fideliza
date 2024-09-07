import { Request, Response } from "express";
import AwardsService from "../services/awards.service";
import multer from 'multer';
import storageAwards from "../../upload/cloudinaryConfig";


const awardsService = new AwardsService();
const upload = multer({storage: storageAwards})
export default class AwardsController {

    async create(req: Request, res: Response): Promise<void> {
        this.uploadImage(req, res, async () => {
            try {
                const awardData = {
                    ...req.body,
                    image_url: (req.file as Express.Multer.File)?.path,
                };

                const award = await awardsService.create(awardData);
                res.status(200).send({ msg: 'Award created successfully', award });
            } catch (error) {
                res.status(500).send({ msg: error instanceof Error ? error.message : 'Unknown error' });
            }
        });
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const award = await awardsService.update(req.body);
            res.status(200).send({ msg: 'Award updated sucessfull', award });
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    async getAllByStore(req: Request, res: Response): Promise<void> {
        const {storeId} = req.params;
        try {
            const awards = await awardsService.getAllByStore(parseInt(storeId));
            res.status(200).send({awards});
        } catch (error) {
            res.status(500).send({msg: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }

    private uploadImage(req: Request, res: Response, next: () => void): void {
        upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(500).send({ msg: 'Image upload failed', error: err.message });
            }
            next();
        });
    }
}