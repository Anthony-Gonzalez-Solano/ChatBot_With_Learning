export const queries = {
    obtener:'select * from PREGUNTAS',
    insertar:'insert into PREGUNTAS (pregunta,respuesta) values (@pregunta,@respuesta)',
    modificar: 'update PREGUNTAS set respuesta = @respuesta where pregunta = @pregunta'
}