import { asyncHandler } from '../utils/async-handler'
import User from '../models/user.models'
import ApiError from '../utils/api-erro'
import { UserRolesEnum } from '../utils/constants'
import { sendMail , welcomeRegisterMessage , emailVarificationMailGenContent , forgotPasswordMailGenContent} from '../utils/mail'
import { ApiResponse } from '../utils/api-response'


const generateAccessAndRefreshTokens  = async (userId) => {
    try{
        const user = await User.findById(userId)
        
        const accessToken = user.genrateAccessToken();
        const refreshToken = user.genrateRefreshToken();

        // attach refresh token to the user document to avoid refreshing the access token with multiple refresh tokens
        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false });
        return {accessToken , refreshToken}
    }catch(error) {
        throw new ApiError(
        500,
        "Something went wrong while generating the access token"
        );
    }
}

const registerUser = asyncHandler(async (req , res) => {
    const {email , username, password , role } = req.body;

    try{
        const isUserExists = await User.findById({
            $or: [{username} , {email}]
        })
        if(isUserExists) {
            throw new ApiError(
            400,
            "User already exists"
            );
        }
        const user = await User.create({
            username,
            email,
            password,
            isVarifiedEmail: false,
            role: role || UserRolesEnum.MEMBER
        })
        /**
            * assign hashedToken and tokenExpiry in DB till user clicks on email verification link
            * The email verification is handled by {@link verifyEmail}
        */
        const { unHashedToken, hashedToken, tokenExpiry } = user.generateTempraryToken();
        user.emailVarificationToken = unHashedToken;
        user.emailVarificationTokenExpiry = tokenExpiry;
        await user.save({ validateBeforeSave: false });

        // send mail

        await sendMail({
            email: user?.email,
            subject: "Please verify your email",
            mailgenContent: emailVarificationMailGenContent(
            user.username,
            `${req.protocol}://${req.get(
                "host"
            )}/api/v1/users/verify-email/${unHashedToken}`
            ),
        });

        // createResponse
        const createdUser = await User.findById(user._id)
            .select("-password , -refreshToken -emailVerificationToken -emailVerificationExpiry")

        if(!createdUser) {
            throw new ApiError(
                500,
                "Something went wrong while registering the use
            )
        }
        // return response
        return res.status(200).json(
            new ApiResponse(
                200,
                { user: createdUser },
                 "Users registered successfully and verification email has been sent on your email."
            )
        )
    }catch(error){
        throw new ApiError(
        400,
        "Registration Failed"
        );
    }

})


const login = asyncHandler(async (req , res) => {})

const logout = asyncHandler(async(req , res) => {})
const varifyEmail = asyncHandler(async (req , res) => {})
const resendVarifyEmail = asyncHandler(async (req , res) => {})
const refreshAccessToken = asyncHandler(async (req , res) => {})
const forgetPasswordRequest = asyncHandler(async(req , res) => {})
const resetPassword = asyncHandler(async(req , res) => {})
const getUserProfile = asyncHandler(async(req , res) => {})


export { registerUser , login , varifyEmail , resendVarifyEmail , refreshAccessToken ,  forgetPasswordRequest , resetPassword , logout , getUserProfile }