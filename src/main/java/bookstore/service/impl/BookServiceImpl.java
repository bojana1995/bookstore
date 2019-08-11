package bookstore.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bookstore.model.Book;
import bookstore.repository.BookRepository;
import bookstore.service.BookService;

@Service
@Transactional
public class BookServiceImpl implements BookService {

	@Autowired
	BookRepository bookRepository;
	
	@Override
	public Book findOne(Long id) {
		return bookRepository.findById(id);
	}

	@Override
	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	@Override
	public List<Book> findByTitle(String title) {
		return bookRepository.findByTitle(title);
	}

	@Override
	public List<Book> findAuthor(String author) {
		return bookRepository.findByAuthor(author);
	}

	@Override
	public List<Book> findByPublishingYear(int publishingYear) {
		return bookRepository.findByPublishingYear(publishingYear);
	}

	@Override
	public List<Book> findByPublisher(String publisher) {
		return bookRepository.findByPublisher(publisher);
	}

	@Override
	public List<Book> findByPrice(double price) {
		return bookRepository.findByPrice(price);
	}

	@Override
	public Book save(Book book) {
		return bookRepository.save(book);
	}

	@Override
	public Book delete(Long id) {
		Book book = bookRepository.findById(id);
		if(book == null) {
			throw new IllegalArgumentException("Attempt to delete non-existent book.");
		}
		bookRepository.delete(book);
		return book;
	}
	
}
