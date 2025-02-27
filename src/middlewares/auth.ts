import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface AuthenticatedRequest extends Request {
    user?: any; 
}
export function validateAuth(requiredRole?: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
			const authHeader = req.headers.authorization;
			const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
			if (!token) {
					return res.status(401).send({ msg: 'Token not found' });
			}
			try {
					const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
					if (requiredRole && !requiredRole.includes(decoded.role)) {
							return res.status(403).send({ msg: 'Access denied' });
					}
					req.user = decoded;
					next();
			} catch (error) {
					console.log(error);
					return res.status(401).send({ msg: 'Token invalid' });
			}
    };
}