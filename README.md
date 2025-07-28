# Authentication Pages

This project provides robust authentication for both Users and Captains.

### Login

- **Path:** `/auth/login`
- **Features:**
  - Role selection (User or Captain) with distinct login endpoints.
  - Form validation using `react-hook-form` and `zod`.
  - Friendly error and loading states.
  - Redirects to the appropriate dashboard on success.
  - Links to registration and password reset.

### Registration

- **Path:** `/auth/register`
- **Features:**
  - Role selection (User or Captain) with different forms.
  - **User Registration:** Requires full name, email, password, and password confirmation.
  - **Captain Registration:** Requires all user fields plus vehicle details (type, plate number, color, capacity).
  - Form validation using `react-hook-form` and `zod`.
  - Friendly error and loading states.
  - Redirects to login on successful registration.
  - Link to login page for existing users.

### File Structure

```
app/auth/
  login/page.tsx         // Login page with role selection
  register/page.tsx      // Registration page for users and captains
  forgot-password/page.tsx
  reset-password/page.tsx
hooks/
  login-hook.ts          // Login logic and validation
  register-hook.ts       // Registration logic and validation
```

See each file
