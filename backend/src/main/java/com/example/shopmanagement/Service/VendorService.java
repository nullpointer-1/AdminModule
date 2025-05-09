package com.example.shopmanagement.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shopmanagement.dto.CredentialDto;
import com.example.shopmanagement.model.Shop;
import com.example.shopmanagement.model.Vendor;
import com.example.shopmanagement.repository.VendorRepository;

@Service
public class VendorService {

	@Autowired
	private EmailService emailService;
	@Autowired
	private VendorRepository vendorRepository;
	
	
	
	public Vendor addIntoDb(CredentialDto dto) {
		String email = dto.getEmail();
		String userName = dto.getUsername();
		String passWord = dto.getPassword();
		Optional<Vendor> obj = this.getShopById(dto.getShopId());
		Vendor vendor = obj.orElseThrow(() -> new RuntimeException("Vendor not found"));
		vendor.setEmail(email);
		vendor.setUsername(userName);
		vendor.setPassword(passWord);
		String subject="Congratulations , your credentials in our cafeteria got generated!!";
		String message= "The admin has generated the credentials for you /n "
				+ "Your username is :"+userName +"/n" + "your current password is : "+ passWord;
		
		
//		emailService.sendEmail(email,subject,message);
		emailService.sendContactEmail(userName, email, message);
		
	
//		System.out.println(vendor.getId() + " " + vendor.getName() + " " + vendor.getCreatedAt() + " " + vendor.getContactNumber());
//		System.out.println(dto.getShopId() + " " + email + " " + userName + " " + passWord);
		return vendorRepository.save(vendor);
	}
	
	 public Optional<Vendor> getShopById(Long id) {
	        return vendorRepository.findById(id);
	 }

}
