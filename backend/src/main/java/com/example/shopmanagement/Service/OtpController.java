package com.example.shopmanagement.Controllers;

import com.example.shopmanagement.Service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    // Send OTP
    @GetMapping("/send")
    public String sendOtp(@RequestParam String phone) {
        String otp = String.valueOf((int)(Math.random() * 9000) + 1000); // Generate 4-digit OTP
        return otpService.sendOtp(phone, otp);
    }

    // Verify OTP
    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String phone, @RequestParam String otp) {
        System.out.println("Verifying OTP for phone: " + phone + " with OTP: " + otp);;
        boolean isVerified = otpService.verifyOtp(phone, otp);
        if (isVerified) {
            otpService.clearOtp(phone); // Clear OTP once verified
            return "✅ OTP Verified Successfully!";
        } else {
            return "❌ Invalid or Expired OTP.";
        }
    }
}
