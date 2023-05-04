
const calculateCost = (numOfMessages) => {
    
    if (numOfMessages >= 300) {
        return 399;
    } else if (numOfMessages >= 100) {
        return 149;
    } else if (numOfMessages >= 52) {
        return 99;
    } else if (numOfMessages >= 16) {
        return 9.9;
    } else if (numOfMessages >= 3) {
        return 2.4;
    } else if (numOfMessages >= 1) {
        return 1;
    } else {
        return 0;
    }
}

export default calculateCost;

