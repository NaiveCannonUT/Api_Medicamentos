CREATE DATABASE medicamentos;

USE medicamentos;

CREATE TABLE medicamentos (
id_medicamentos INT AUTO_INCREMENT PRIMARY KEY,
medicamento VARCHAR(45) NOT NULL,
dosis_id INT,
hora TIME NOT NULL,
fecha DATE NOT NULL,
comentarios TEXT,
id_horario INT NOT NULL,
intervalo INT,
dias INT,
FOREIGN KEY (dosis_id) REFERENCES dosis(id_dosis),
FOREIGN KEY (id_horario) REFERENCES horario(id_horario)
);

CREATE TABLE dosis (
id_dosis INT AUTO_INCREMENT PRIMARY KEY,
dosis FLOAT NOT NULL,
medida VARCHAR (10) NOT NULL
);

CREATE TABLE horario(
id_horario INT AUTO_INCREMENT PRIMARY KEY,
horario VARCHAR(50)
);

INSERT INTO dosis (dosis, medida)
VALUES (0.5, 'ML');

SHOW TABLES;

SELECT*FROM dosis;

INSERT INTO medicamentos (medicamento, dosis_id, hora, fecha, comentarios, id_horario)
VALUES ('Paracetamol',1 , '14:30:00', 9999-12-3 ,'comentario 1', '1');

INSERT INTO medicamentos (medicamento, dosis_id, hora, fecha, comentarios, id_horario)
VALUES ('Paracetamol',1 , '14:30:00', '1999-12-3' ,'hjgjgjdhgdhgfsgfdhyjdjysht', '1');

SELECT*FROM medicamentos;

DROP TABLE IF EXISTS medicamentos;

DELETE FROM medicamentos
WHERE medicamento = 'Paracetamol';