import { loginUser } from '../service/userService.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await loginUser({ username, password });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            samesite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: 'login berhasil',
            data: {
                id: user.id,
                username: user.username,
                role: user.role,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
