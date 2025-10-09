import JWT from 'jsonwebtoken'
import { asyncHandler } from '../utils/async-handler'
import User from '../models/user.models';
import ApiError from '../utils/api-erro';



export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        );
        if (!user) {
        // Client should make a request to /api/v1/users/refresh-token if they have refreshToken present in their cookie
        // Then they will get a new access token which will allow them to refresh the access token without logging out the user
            throw new ApiError(401, "Invalid access token");
        }
        req.user = user;
        next();
    } catch (error) {
        // Client should make a request to /api/v1/users/refresh-token if they have refreshToken present in their cookie
        // Then they will get a new access token which will allow them to refresh the access token without logging out the user
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

/**
 *
 * ---description--- Middleware to check logged in users for unprotected routes. The function will set the logged in user to the request object and, if no user is logged in, it will silently fail.
 *
 * `NOTE: THIS MIDDLEWARE IS ONLY TO BE USED FOR UNPROTECTED ROUTES IN WHICH THE LOGGED IN USER'S INFORMATION IS NEEDED`
 */
export const isLoggedInOrIgnore = asyncHandler(async (res , res , next) => {
    const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer", "");
    if(!token) {
        return new ApiError(
            400,
            "Invalid access token"
        )
    }
    try{
        const decodeToken = JWT.verify(token , process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodeToken?._id)
            .select("-password , -refreshToken -emailVarificationToken, -emailVarificationTokenExpiry")
        req.user = user;
        next()
    }catch(error) {
        return new ApiError(
            500,
            "failed to authenticate"
        )
    next()
    }
})
