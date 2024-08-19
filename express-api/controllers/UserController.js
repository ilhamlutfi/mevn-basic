const express = require('express')
const prisma = require('../prisma/client')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            },
            orderBy: {
                id: 'desc'
            }
        })

        res.status(200).json({
            success: true,
            message: 'Get all users successfully',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const show = async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with id: ${id}`
            })
        }

        res.status(200).json({
            success: true,
            message: `Get user by id: ${id}, successfully`,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error' + error,
        })
    }
}

const store = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array()
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error' + error,
        })
    }
}

//function updateUser
const update = async (req, res) => {

    //get ID from params
    const {
        id
    } = req.params;

    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {

        //update user
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        //send response
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            data: user,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

const destroy = async (req, res) => {
    const { id } = req.params

    try {
        // check user exist
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with id: ${id}`
            })
        }

        // delete user
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({
            success: true,
            message: `Delete user by id: ${id}, successfully`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error' + error
        })
    }
}

module.exports = { getUsers, store, show, update, destroy }
