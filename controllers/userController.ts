import { Request, Response } from "express";
import User from '../models/user';



export const getUser = async (request: Request, response: Response) => {
    const { id } = request.params;

    const user = await User.findByPk(id);

    if (!user) {
        return response.status(404).json({
            msg: 'User not found'
        })
    }

    response.json({
        msg: 'GET',
        user
    })
}


export const getUsers = async (request: Request, response: Response) => {

    const users = await User.findAll();

    response.json({
        msg: 'GET',
        users
    });
}


export const postUser = async (request: Request, response: Response) => {
    const { body } = request;

    try {
        const userExists = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (userExists) {
            return response.status(400).json({
                msg: 'Already an user with tha email',
            });
        }

        const user = User.build(body)
        await user.save();


        return response.status(201).json({
            msg: 'POST',
            user
        });


    } catch (err) {
        console.log(err);
        return response.status(500).json({
            msg: 'Something went wrong'
        })
    }
}



export const putUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { body } = request;


    try {

        const user = await User.findByPk(id);

        if (!user) {
            return response.status(404).json({
                msg: 'User not found'
            })
        }


        const emailExists = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (emailExists) {
            return response.status(400).json({
                msg: 'Already an user with tha email',
            });
        }

        // we can extract the data we don't want to be taken in the body
        await user.update(body);


        return response.json({
            msg: 'PUT',
            user
        });


    } catch (err) {
        console.log(err);
        return response.status(500).json({
            msg: 'Something went wrong'
        })
    }
}



export const deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {

        const user = await User.findByPk(id);

        if (!user) {
            return response.status(404).json({
                msg: 'User not found'
            })
        }

        //soft delete
        await user.update({ state: false });

        //hard delete
        //await user.destroy();

        return response.json({
            msg: 'DELETE',
            user
        });


    } catch (err) {
        console.log(err);
        return response.status(500).json({
            msg: 'Something went wrong'
        })
    }
}



