package bookstore.controller;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bookstore.Encryptor;
import bookstore.dto.MyUserDTO;
import bookstore.model.MyUser;
import bookstore.model.ShoppingCart;
import bookstore.model.UserType;
import bookstore.repository.MyUserRepository;
import bookstore.service.ShoppingCartService;
import bookstore.service.EmailService;
import bookstore.service.MyUserService;
import bookstore.service.RoleService;

@RestController
@RequestMapping(value = "/myUser")
public class MyUserController {
	
	@Autowired
	MyUserService myUserService;
	
	@Autowired
	MyUserRepository myUserRepository;
	
	@Autowired
	RoleService roleService;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	ShoppingCartService shoppingCartService;
	
	private static final Logger logger = LoggerFactory.getLogger(MyUserController.class);
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<MyUser> getOne(@PathVariable Long id) {
		MyUser user = myUserService.findOne(id);
		
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
			
	@RequestMapping(value="/getAll", method = RequestMethod.GET)
	public ResponseEntity<List<MyUser>> getAll() {
		List<MyUser> users = myUserService.findAll();	
		
		if(users.equals(null)) {
			return new ResponseEntity<>(users, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
		
	@RequestMapping(value = "/registration", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MyUser> registration(@RequestBody MyUserDTO request) throws MailException, InterruptedException, MessagingException, InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException, ParseException {		
		String encryptedString = Encryptor.encrypt(request.getEmail());
		//String hashedPassword = bCryptPasswordEncoder.encode(request.getPassword());
		
		MyUser user = new MyUser();
		ShoppingCart shoppingCart = new ShoppingCart();
		user.setName(request.getName());
		user.setSurname(request.getSurname());
		user.setAddress(request.getAddress());
		user.setPhone(request.getPhone());
		user.setEmail(encryptedString);
		user.setPassword(request.getPassword());		
		user.setUserType(UserType.VISITOR);
		user.setActivatedAccount(false);
		user.setShoppingCart(shoppingCart);
		
		for(MyUser u : myUserService.findAll()) {
			if(!u.getEmail().equals(user.getEmail())) {
				if(!user.getEmail().isEmpty() && !user.getPassword().isEmpty()) {
					user.setRole(roleService.findById(2L)); //default: visitor
					emailService.sendMailToActivateAccount(user);
					shoppingCartService.save(shoppingCart);
					myUserService.save(user);
					logger.info("\n\t\tUser " + request.getEmail() + " is successfully registered.\n");
					return new ResponseEntity<MyUser>(user, HttpStatus.OK);
				}
			}
		}
			
		logger.info("\n\t\tFailed to register user.\n");
		return new ResponseEntity<MyUser>(user, HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "/activateUserAccount/{email}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MyUser> activateUserAccount(@PathVariable String email) throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException {
		String concatenated = email + ".com"; //zakucano...		
		String encryptedString = Encryptor.encrypt(concatenated);
		List<MyUser> users = myUserService.findAll();
		
		for(int i = 0; i < users.size(); i++) {
			if(users.get(i).getEmail().equals(encryptedString)) {
				MyUser u = users.get(i);
				u.setActivatedAccount(true);
				myUserService.save(u);
				logger.info("\n\t\tUser " + concatenated + " has activated his user account.\n");
				return new ResponseEntity<MyUser>(u, HttpStatus.OK);
			}
		}
		
		logger.info("\n\t\tUser account activation failed.\n");
		return new ResponseEntity<MyUser>(HttpStatus.NOT_FOUND);
	}
		
	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MyUser> login(@RequestBody MyUserDTO request) throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException{
		String encryptedString = Encryptor.encrypt(request.getEmail());
		MyUser u = myUserService.findByEmail(encryptedString);
		
		if(u != null) {
			if(u.getEmail().equals(encryptedString) /*&& bCryptPasswordEncoder.matches(request.getPassword(), u.getPassword())*/ && u.isActivatedAccount() == true) {			
				myUserService.setCurrentUser(u);
				logger.info("\n\t\tUser " + request.getEmail() + " logged on to the system.\n");
				return new ResponseEntity<MyUser>(u, HttpStatus.OK);
			} else {
				System.out.println("\n\t\tThere is no user with the email and password entered in the database.\n");
			}
		}
			
		logger.info("\n\t\tFailed to log in to the system.\n");
		return new ResponseEntity<MyUser>(u, HttpStatus.NOT_FOUND);
	}
	
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/getCurrentlyActive", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MyUser> getCurrentlyActive(){
		MyUser u = myUserService.getCurrentUser();
		
		if(u == null)
			return new ResponseEntity<MyUser>(u, HttpStatus.NOT_FOUND);
			
		return new ResponseEntity<MyUser>(u, HttpStatus.OK);
	}
	
	//@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ResponseEntity<MyUser> logout() throws InvalidKeyException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException, NoSuchPaddingException, NoSuchAlgorithmException {
		MyUser u = myUserService.getCurrentUser();
		
		if(u != null) {
			String decryptedString = Encryptor.decrypt(u.getEmail());			
			SecurityContextHolder.clearContext();
			logger.info("\n\t\tUser " + decryptedString + " logged out of the system.\n");
		}
		
		logger.info("\n\t\tNo one is logged in.\n");
		return new ResponseEntity<MyUser>(u, HttpStatus.OK);
	}
	
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/encryptEmail", method = RequestMethod.GET)
	public String encryptEmail() throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException{
		MyUser u = myUserService.getCurrentUser();
		String encryptedString = Encryptor.encrypt(u.getEmail());
		return encryptedString;
	}
		
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/decryptEmail", method = RequestMethod.GET)
	public String decryptEmail() throws InvalidKeyException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException, NoSuchPaddingException, NoSuchAlgorithmException{
		MyUser u = myUserService.getCurrentUser();
		String decryptedString = Encryptor.decrypt(u.getEmail());
		return decryptedString;
	}
	
	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value="/update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MyUser> update(@RequestBody MyUser request) throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException {
		MyUser u = myUserService.getCurrentUser();
		
		if(u != null) {
			String encryptedString = Encryptor.encrypt(request.getEmail());
			
			u.setEmail(encryptedString);
			u.setPassword(request.getPassword());
			u.setActivatedAccount(true);
			u.setRole(u.getRole());
			
			myUserService.save(u);
			logger.info("\n\t\tUser " + request.getEmail() + " has updated his account.\n");
			return new ResponseEntity<MyUser>(u, HttpStatus.OK);
		}
		
		logger.info("\n\t\tFailed to update user " + request.getEmail() +".");
		return new ResponseEntity<MyUser>(u, HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MyUser> delete(@RequestBody MyUser request) throws InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException, UnsupportedEncodingException {
		MyUser u = myUserService.findOne(request.getId());
		String encryptedString = Encryptor.encrypt(request.getEmail());
		
		if(u != null) {
			myUserService.delete(u.getId());
			logger.info("\n\t\tUser " + encryptedString + " deleted.\n");
			return new ResponseEntity<MyUser>(u, HttpStatus.OK);
		}
		
		logger.info("\n\t\tFailed to delete user " + encryptedString +".");
		return new ResponseEntity<MyUser>(u, HttpStatus.NOT_FOUND);
	}
	
}
