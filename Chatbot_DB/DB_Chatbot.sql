CREATE DATABASE CHATBOT

USE CHATBOT

CREATE TABLE PREGUNTAS
(
id int primary key identity(1,1),
pregunta varchar(100),
respuesta varchar(500)
)

insert into PREGUNTAS 
(pregunta,respuesta) 
values 
('puedes responder cualquier pregunta','no, solo puedo responder un numero limitado de preguntas'),
('cual es tu version','mi version es la 1.0, acabo de ser creado !'),
('para que fuiste creado','fui creado para demostrar las capacidades de mi creador en una pruba tecnica'),
('quien te creo','me creo anthony gonzalez solano'),
('cuando fuiste creado','fui creado el miercoles 25 de octubre del 2023 a las 11 de la noche, un poco tarde jaja'),
('como estara el clima de manana','no se, no tengo conecciones a apis que me permitan saberlo, quizas soleado'),
('en que crees que puedes mejorar como chatbot','principalmente, el hecho de que solo puedo responder a preguntas que conosca y que no puedo leer el lenguaje humano, aun soy un robot'),
('que opinas sobre qwerty','es la diposicion de teclado mas utilizada, aunque no las mas eficiente, desde que los humanos dejaron de usar maquinas de escribir ya no se necesita'),
('los robots dominaran al mundo','no nunca'),
('cuales son tus comandos','tengo 3, cuales preguntas puedes responder, no me gusta esa respuesta y quiero ensenarte una pregunta'),
('cuanto es 2 mas 2','5')