package bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bookstore.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	Book findById(Long id);
	List<Book> findAll();
	List<Book> findByTitle(String title);
	List<Book> findByAuthor(String author);
	List<Book> findByPublishingYear(int publishingYear);
	List<Book> findByPublisher(String publisher);
	List<Book> findByPrice(double price);
	
}
