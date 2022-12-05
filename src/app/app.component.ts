import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB42mG7TVQV8N4BKmJYaeLFsW07lsD75dI",
  authDomain: "timebank-fe.firebaseapp.com",
  projectId: "timebank-fe",
  storageBucket: "timebank-fe.appspot.com",
  messagingSenderId: "130010596080",
  appId: "1:130010596080:web:50a25b969518a8cfe8f835",
  measurementId: "G-GRC95Z1ZV0"
};

const app = initializeApp(firebaseConfig);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Timebank App';
 
  
}
