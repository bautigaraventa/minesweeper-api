import { celebrate, Joi } from 'celebrate';

/**
 * Work with endpoints validations to use them as middlewares
 */
export class MineSweeperValidator {

    public startGame = celebrate({
        body: Joi.object().keys({
            rows: Joi.number().min(5).required(),
            columns: Joi.number().min(5).required(),
            mines: Joi.number().min(1).required(),
            player: Joi.string().required(),
        }),
    });

    public endGame = celebrate({
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),
        body: Joi.object().keys({
            board: Joi.array().items(Joi.any().required()).required(),
            won: Joi.boolean().required(),
            lost: Joi.boolean().required(),
            timer: Joi.number().required(),
        }),
    });

    public pauseGame = celebrate({
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),
        body: Joi.object().keys({
            board: Joi.array().items(Joi.any().required()).required(),
            timer: Joi.number().required(),
        }),
    });

    public resumeGame = celebrate({
        params: Joi.object().keys({
            id: Joi.string().required(),
        }),
    });

    public getByPlayer = celebrate({
        params: Joi.object().keys({
            player: Joi.string().required(),
        }),
    });

}

export const mineSweeperValidator = new MineSweeperValidator();