package bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bookstore.model.MyUser;
import bookstore.model.Role;

@Repository
public interface MyUserRepository extends JpaRepository<MyUser, Long> {

	MyUser findById(Long id);
	List<MyUser> findAll();
	MyUser findByEmail(String email);
	List<MyUser> findByRole(Role role);
	
}
