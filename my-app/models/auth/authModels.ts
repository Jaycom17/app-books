
/**
 * Interface for user sign-up data.
 * @property {string} [email] - The user's email address.
 * @property {string} [password] - The user's password.
 * @property {string} [confirmPassword] - Confirmation of the user's password.
 */
export interface SignUpData {
    email: string;
    password: string;
    confirmPassword: string;
}

/**
 * Interface for user sign-in data.
 * @property {string} [email] - The user's email address.
 * @property {string} [password] - The user's password.
 */
export interface SignInData {
    email: string;
    password: string;
}

/**
 * Interface for changing user password.
 * @property {string} [newPassword] - The new password for the user.
 * @property {string} [confirmNewPassword] - Confirmation of the new password.
 */
export interface ChangePasswordData {
    newPassword: string;
    confirmNewPassword: string;
}