import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sentPassword] = useState("123456"); // Mock password for validation
  const navigate = useNavigate();

  const handleEmailSubmit = () => {
    setEmailSubmitted(true);
  };

  const handlePasswordSubmit = () => {
    if (password === sentPassword) {
      navigate("/reset-password");
    } else {
      alert("Incorrect password. Please try again.");
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
          Forgot Password
        </Typography>
        {!emailSubmitted ? (
          <>
            <Typography variant="body2" color="gray" mb={2}>
              Enter your registered email to receive a temporary password.
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="disabled" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2, backgroundColor: "#f7f7f7", borderRadius: 1 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleEmailSubmit}
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
              Send Code
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body2" color="gray" mb={2}>
              Enter the temporary password sent to your email.
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Temporary Password"
              placeholder="Enter the code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
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
              onClick={handlePasswordSubmit}
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
              Verify and Reset Password
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPassword;
