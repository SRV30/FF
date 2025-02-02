import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (password === confirmPassword) {
      alert("Password reset successful!");
      // Redirect to login page or perform other actions
    } else {
      alert("Passwords do not match!");
    }
  };

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
          Reset Password
        </Typography>
        <Typography variant="body2" color="gray" mb={2}>
          Enter your new password below.
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="disabled" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, backgroundColor: "#f7f7f7", borderRadius: 1 }}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="disabled" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, backgroundColor: "#f7f7f7", borderRadius: 1 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleReset}
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
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
