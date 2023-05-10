const sentenceCase = (str) => {
    if (!str) return '';
  
    const sentence = str.toLowerCase().split(' ');
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
  }

export default sentenceCase;