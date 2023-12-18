import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { QuestionsService } from "../services/preguntas.service"

class Message {
  constructor(public type: string, public message: string) {}
}
class Question {
  constructor(public Pregunta: string, public Respuesta: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  messages: Message[] = [];
  newMessage: string = "";
  questions: any[] =[];
  canSendMessage: boolean = false;
  state:string = '';
  questionToSave: string = '';
  responseToSave: string ='';

  constructor(private S_questions:QuestionsService){}

  ngOnInit() {
    this.S_questions.List().subscribe( (res) => {
      this.questions = res
      this.messages.push(new Message('bot', 'Hola, soy un bot'));
      this.questionsMessage()
    })
  }

  questionsMessage() {
    let questions = ''
    for (let i = 0; i < this.questions.length; i++) {
      questions = questions+'<br /> - '+this.questions[i].pregunta
    }
    this.messages.push(new Message('bot', 'puedo responderte estas preguntas:'+questions));
  }

  scrollToBottom() {
    setTimeout(() => {
      const miDiv = document.getElementById('message-content');
      if(miDiv!=null){
        miDiv.scrollTop = miDiv.scrollHeight;
      }
    }, 50);
  }

  normalizeText(str: string):string {
    const newStr = str.replace(/[?¿]/g, '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return newStr
  }


  questionCheck(question:string):boolean {;
    const ask = this.newMessage.replace(/[?¿]/g, '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if(ask == question){
      return true
    }
    return false;
  }

  sendMessage() {
    this.canSendMessage = true
    if(this.newMessage != ''){
      this.messages.push(new Message('user', this.newMessage));

      if(this.normalizeText(this.newMessage) == 'cuales preguntas puedes responder'){
        this.questionsMessage()
        this.canSendMessage = false
      }else{
        if(this.normalizeText(this.newMessage) == 'no me gusta esa respuesta'){
          this.state = 'openUpdateQuestion'
        }else if(this.normalizeText(this.newMessage) == 'quiero ensenarte una pregunta'){
          this.state = 'openGetQuestion'
        }
  
        if(this.state !== ''){
          switch(this.state){
            case 'openGetQuestion':
              this.messages.push(new Message("bot",'Exelente !!, dime la pregunta, solamente la pregunta no digas nada como "la pregunta es ...", por ejemplo "¿Cómo estás hoy?", asi podre registrarla correctamente'))
              this.state = 'waitingQuestion'
              break;
            case 'waitingQuestion':
              this.questionToSave = this.normalizeText(this.newMessage)
              this.messages.push(new Message("bot",'Gran pregunta, ¿Cuál seria la respuesta a ella?'))
              this.state = 'waitingResponse'
              break;
            case 'waitingResponse':
              this.S_questions.Insert(new Question(this.questionToSave,this.normalizeText(this.newMessage))).subscribe(
                () => {
                  this.messages.push(new Message("bot",'Perfecto, he registrado la pregunta'))
                  this.state = ''
                  this.S_questions.List().subscribe( (res) => {
                    this.questions = res
                  })
                }
              )
              break;
            case 'openUpdateQuestion':
              this.messages.push(new Message("bot",'Mis disculpas, ¿Cuál seria una mejor respuesta?'))
              this.state = 'waitingResponseToUpdate'
              break;
            case 'waitingResponseToUpdate':
              this.S_questions.Update(new Question(this.normalizeText(this.messages[this.messages.length - 5].message),this.normalizeText(this.newMessage))).subscribe(
                () =>{
                  this.messages.push(new Message("bot",'Listo, actualizare mi respuesta para esa pregunta'))
                  this.state = ''
                  this.S_questions.List().subscribe( (res) => {
                    this.questions = res
                  })
                }
              )
              break;
            default:
              this.messages.push(new Message("bot",'Creo que hubo un problema en alguna parte, olvidemos los que estabamos haciendo'))
              this.state = ''
              break;
          }
          this.canSendMessage = false
        }else{
          let response = 'Lo siento, no tengo respuestas para esa pregunta'
          for (let i = 0; i < this.questions.length; i++) {
            if(this.questionCheck(this.questions[i].pregunta)){
              response = this.questions[i].respuesta;
            }
          }
          this.messages.push(new Message("bot",response))
          this.canSendMessage = false
        } 
      }
    }
    this.newMessage = '';
    this.scrollToBottom();
  }

  onEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage()
    }
  }
}
