import { createModerator } from '../../services/user';

import {faker }  from "@faker-js/faker";

function generateUsername() {
    const adjectives = ['happy', 'sad', 'silly', 'clever', 'brave', 'funny', 'caring', 'kind', 'smart', 'cool'];
    const nouns = ['panda', 'owl', 'elephant', 'tiger', 'giraffe', 'koala', 'lion', 'monkey', 'bear', 'fox'];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    
    return `${adjective}_${noun}_${randomNumber}`;
  }

  function generateRandomEmail() {
    const providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const domains = ['com', 'org', 'net', 'info', 'io'];
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    
    const usernameLength = Math.floor(Math.random() * 10) + 5; // 5-14 characters
    let username = '';
    for (let i = 0; i < usernameLength; i++) {
      if (Math.random() < 0.5) {
        username += letters[Math.floor(Math.random() * letters.length)];
      } else {
        username += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }
    
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return `${username}@${provider}.${domain}`;
  }
  

function generateRandomFemaleProfile() {
  // Generate a random name
  const name = faker.name.findName(undefined, undefined, 0, 'female');

  // Generate a random age
  const age = faker.datatype.number({min: 18, max: 50});

  // Generate a random height in centimeters
  const height = faker.datatype.number({min: 150, max: 170});

  // Generate a random "about" description
  const about = faker.lorem.sentences();

  const username = generateUsername();

  const email = generateRandomEmail();

  const password = "Psssword";

  // const number = Math.floor(Math.random() * 99) + 10;

  const profilePictureUrl =  `https://images.unsplash.com/photo-1575439462433-8e1969065df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`;

  // https://images.unsplash.com/photo-1575439462433-8e1969065df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80

  // Return an object containing the profile information
  return { name, age, height, password, about, avatarImage:profilePictureUrl, username, email };
}


  
export function generateModerator() {
    const data = generateRandomFemaleProfile();
    const createdData = createModerator(data)
    return createdData;
}
