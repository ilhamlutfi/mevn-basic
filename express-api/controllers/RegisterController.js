const express = require('express')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const prisma = require('../prisma/client')

const store = async (req, res) => {
    const errors = validationResult(req)

    // if error
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        // insert data

        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            }
        })

        res.status(201).json({
            success: true,
            message: "Register successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })  
    }
}

module.exports = { store }
