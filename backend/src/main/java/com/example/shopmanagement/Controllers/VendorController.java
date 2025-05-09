package com.example.shopmanagement.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shopmanagement.Service.VendorService;
import com.example.shopmanagement.dto.CredentialDto;
import com.example.shopmanagement.dto.ShopDto;
import com.example.shopmanagement.model.Shop;
import com.example.shopmanagement.model.Vendor;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin("*")
public class VendorController {

	@Autowired
	private VendorService vendorService;
	
	@PostMapping("/credentials")
	public ResponseEntity<String> createCredentials(@RequestBody CredentialDto dto){
		
		Vendor response=vendorService.addIntoDb(dto);
		return new ResponseEntity<String>("Credentials added,/nEmail Sent Successfully ",HttpStatus.OK);
	}
	
}
