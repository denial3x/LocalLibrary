import Genre from "./src/models/genre";
import Author from "./src/models/author";
import Book from "./src/models/book";
import BookInstance from "./src/models/book-instance";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const authorsIds: string[] = [];
const genresIds: string[] = [];
const booksIds: string[] = [];

async function createGenre(name: string) {
  const genre = new Genre({ name: name });
  const savedGenre = await genre.save();
  console.log("Genre saved: ", savedGenre);
  genresIds.push(savedGenre._id);
}

async function createAuthor(firstName: string, familyName: string, dateOfBirth?: Date, dateOfDeath?: Date) {
  const author = new Author({
    first_name: firstName,
    family_name: familyName,
    date_of_birth: dateOfBirth,
    date_of_death: dateOfDeath,
  });

  const savedAuthor = await author.save();
  console.log("Author saved: ", savedAuthor);
  authorsIds.push(savedAuthor._id);
}

async function createBook(title: string, summary: string, isbn: string, author: string, genre?: string[]) {
  const book = new Book({
    title: title,
    author: author,
    summary: summary,
    isbn: isbn,
    genre: genre,
  });

  const savedBook = await book.save();
  console.log("Book saved: ", savedBook);
  booksIds.push(savedBook._id);
}

async function createBookInstance(bookId: string, imprint: string, status: string, dueback?: string) {
  const bookInstance = new BookInstance({ book: bookId, imprint: imprint, status: status, dueback: dueback });

  try {
    const savedBookInstance = await bookInstance.save();
    console.log("BookInstance saved: ", savedBookInstance);
  } catch (err: unknown) {
    console.error("Error while creating book instance: ", err);
  }
}

async function populate() {
  await createAuthor("Patrick", "Rothfuss", new Date("1973-06-06"));
  await createAuthor("Ben", "Bova", new Date("1932-11-8"));
  await createAuthor("Isaac", "Asimov", new Date("1920-01-02"), new Date("1992-04-06"));
  await createAuthor("Bob", "Billings");
  await createAuthor("Jim", "Jones", new Date("1971-12-16"));

  await createGenre("Fantasy");
  await createGenre("Science Fiction");
  await createGenre("French Poetry");

  await createBook(
    "The Name of the Wind (The Kingkiller Chronicle, #1)",
    "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
    "9781473211896",
    authorsIds[0],
    [genresIds[0]]
  );
  await createBook(
    "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
    "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
    "9788401352836",
    authorsIds[0],
    [genresIds[0]]
  );
  await createBook(
    "The Slow Regard of Silent Things (Kingkiller Chronicle)",
    "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
    "9780756411336",
    authorsIds[0],
    [genresIds[0]]
  );
  await createBook(
    "Apes and Angels",
    "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
    "9780765379528",
    authorsIds[1],
    [genresIds[1]]
  );
  await createBook(
    "Death Wave",
    "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
    "9780765379504",
    authorsIds[1],
    [genresIds[1]]
  );
  await createBook("Test Book 1", "Summary of test book 1", "ISBN111111", authorsIds[4], [genresIds[0], genresIds[1]]);

  await createBook("Test Book 2", "Summary of test book 2", "ISBN222222", authorsIds[4]);

  await createBookInstance(booksIds[0], "London Gollancz, 2014.", "Available");
  await createBookInstance(booksIds[1], " Gollancz, 2011.", "Loaned");
  await createBookInstance(booksIds[2], " Gollancz, 2015.", "");
  await createBookInstance(booksIds[3], "New York Tom Doherty Associates, 2016.", "Available");
  await createBookInstance(booksIds[3], "New York Tom Doherty Associates, 2016.", "Available");
  await createBookInstance(booksIds[3], "New York Tom Doherty Associates, 2016.", "Available");
  await createBookInstance(booksIds[4], "New York, NY Tom Doherty Associates, LLC, 2015.", "Available");
  await createBookInstance(booksIds[4], "New York, NY Tom Doherty Associates, LLC, 2015.", "Maintenance");
  await createBookInstance(booksIds[4], "New York, NY Tom Doherty Associates, LLC, 2015.", "Loaned");
  await createBookInstance(booksIds[0], "Imprint XXX2", "");
  await createBookInstance(booksIds[1], "Imprint XXX3", "");

  await mongoose.connection.close();
}

const mongoDBURL = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error: "));

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.info("Connected to: ", mongoDBURL);
  populate();
});
