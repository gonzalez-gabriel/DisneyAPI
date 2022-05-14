CREATE TABLE character(
  id SERIAL PRIMARY KEY NOT NULL,
  image_Url VARCHAR(255) NOT NULL,
  name VARCHAR(30) NOT NULL,
  age INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  history TEXT NOT NULL
);

CREATE TABLE movie(
  id SERIAL PRIMARY KEY NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  rate INT CHECK (rate > 0 AND rate <6)
);

CREATE TABLE genre(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);


CREATE TABLE character_movie(
  character_id INT,
  movie_id INT,
  PRIMARY KEY (character_id, movie_id),
  CONSTRAINT fk_character FOREIGN KEY (character_id) REFERENCES character(id),
  CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES movie(id)
);

CREATE TABLE genre_movie(
  genre_id INT,
  movie_id INT,
  PRIMARY KEY (genre_id, movie_id),
  CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genre(id),
  CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES movie(id)
);