import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupMode, setSignupMode] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: "white",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          {signupMode ? "Create Account" : "Welcome back"}
        </Typography>

        {signupMode && (
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            placeholder="Enter your full name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="disabled" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          placeholder="Enter your email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="disabled" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, backgroundColor: "#f7f7f7", borderRadius: 1 }}
        />

        <TextField
          fullWidth
          variant="outlined"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="disabled" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOff
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Visibility
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, backgroundColor: "#f7f7f7", borderRadius: 1 }}
        />

        {!signupMode && (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel control={<Checkbox size="small" />} label="Keep me logged in" />
            <Link to="/forgot-password"><Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
              Forgot password?
            </Typography></Link>
          </Box>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#f7a71e",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: 2,
            padding: "12px",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#e69b18" },
          }}
        >
          {signupMode ? "Sign Up" : "Sign In"}
        </Button>

        <Typography textAlign="center" mt={2} color="gray">
          {signupMode ? "Already have an account?" : "Not a member yet?"} {" "}
          <Typography
            component="span"
            color="primary"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => setSignupMode(!signupMode)}
          >
            {signupMode ? "Login" : "Register now"}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;