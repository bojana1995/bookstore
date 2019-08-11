package bookstore.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookstore.model.Book;

@Service
@Transactional
public interface BookService {

	Book findOne(Long id);	
	List<Book> findAll();	
	List<Book> findByTitle(String title);	
	List<Book> findAuthor(String author);
	List<Book> findByPublishingYear(int publishingYear);
	List<Book> findByPublisher(String publisher);
	List<Book> findByPrice(double price);
	
	Book save(Book book);
	
	Book delete(Long id);
	
}
