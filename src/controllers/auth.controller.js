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


const login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if (user.loginType !== UserLoginType.EMAIL_PASSWORD) {
    // If user is registered with some other method, we will ask him/her to use the same method as registered.
    // This shows that if user is registered with methods other than email password, he/she will not be able to login with password. Which makes password field redundant for the SSO
    throw new ApiError(
      400,
      "You have previously registered using " +
        user.loginType?.toLowerCase() +
        ". Please use the " +
        user.loginType?.toLowerCase() +
        " login option to access your account."
    );
  }

  // Compare the incoming password with hashed password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // get the user document ignoring the password and refreshToken field
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  // TODO: Add more options to make cookie more secure and reliable
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options) // set the access token in the cookie
    .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken }, // send access and refresh token in response if client decides to save them by themselves
        "User logged in successfully"
      )
    );
});

const logout = asyncHandler(async(req , res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
        $set: {
            refreshToken: '',
        },
        },
        { new: true }
    );
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
})


const varifyEmail = asyncHandler(async (req , res) => {
    const { verificationToken } = req.params;

    if (!verificationToken) {
        throw new ApiError(400, "Email verification token is missing");
    }

    // generate a hash from the token that we are receiving
    let hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    // While registering the user, same time when we are sending the verification mail
    // we have saved a hashed value of the original email verification token in the db
    // We will try to find user with the hashed token generated by received token
    // If we find the user another check is if token expiry of that token is greater than current time if not that means it is expired
    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiError(489, "Token is invalid or expired");
    }

  // If we found the user that means the token is valid
  // Now we can remove the associated email token and expiry date as we no  longer need them
    user.emailVarificationToken = undefined;
    user.emailVarificationTokenExpiry = undefined;
    // Turn the email verified flag to `true`
    user.isEmailVerified = true;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, { isEmailVerified: true }, "Email is verified"));

})


const resendVarifyEmail = asyncHandler(async (req , res) => {
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    // if email is already verified throw an error
    if (user.isEmailVerified) {
        throw new ApiError(409, "Email is already verified!");
    }

    const { unHashedToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken(); // generate email verification creds

    user.emailVarificationToken = hashedToken;
    user.emailVarificationTokenExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

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

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Mail has been sent to your mail ID"));

})

const refreshAccessToken = asyncHandler(async (req , res) => {

    const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // check if incoming refresh token is same as the refresh token attached in the user document
    // This shows that the refresh token is used or not
    // Once it is used, we are replacing it with new refresh token below
    if (incomingRefreshToken !== user?.refreshToken) {
      // If token is valid but is used already
      throw new ApiError(401, "Refresh token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    // Update the user's refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid refresh token");
        }
})


const forgetPasswordRequest = asyncHandler(async(req , res) => {
      const { email } = req.body;

  // Get email from the client and check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }

  // Generate a temporary token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken(); // generate password reset creds

  // save the hashed version a of the token and expiry in the DB
  user.forgetPasswordToken = hashedToken;
  user.forgetPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  // Send mail with the password reset link. It should be the link of the frontend url with token
  await sendMail({
    email: user?.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailGenContent(
      user.username,
      //  NOTE: Following link should be the link of the frontend page responsible to request password reset
      //  Frontend will send the below token with the new password in the request body to the backend reset password endpoint
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
    ),
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id"
      )
    );
})

const resetPassword = asyncHandler(async(req , res) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    // Create a hash of the incoming reset token

    let hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // See if user with hash similar to resetToken exists
    // If yes then check if token expiry is greater than current date

    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: { $gt: Date.now() },
    });

    // If either of the one is false that means the token is invalid or expired
    if (!user) {
        throw new ApiError(489, "Token is invalid or expired");
    }

    // if everything is ok and token id valid
    // reset the forgot password token and expiry
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

    // Set the provided password as the new password
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password reset successfully"));

})

const changeCurrentPassword = asyncHandler(async(req , res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);

    // check the old password
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid old password");
    }

    // assign new password in plain text
    // We have a pre save method attached to user schema which automatically hashes the password whenever added/modified
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
})  

const getUserProfile = asyncHandler(async(req , res) => {})


export { registerUser , login , varifyEmail , resendVarifyEmail , refreshAccessToken ,  forgetPasswordRequest , resetPassword , logout , changeCurrentPassword, getUserProfile }