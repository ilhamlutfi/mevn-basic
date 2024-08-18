const express = require('express')
const prisma = require('../prisma/client')

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
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

module.exports = { getUsers }
