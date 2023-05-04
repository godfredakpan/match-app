function calculateCompatibilityScore(user, match) {
    let score = 0;
    
    // Calculate compatibility score based on user preferences
    if (user.gender === match.preference.gender) {
      score += 10;
    }
    
    if (user.age >= match.preference.minAge && user.age <= match.preference.maxAge) {
      score += 10;
    }
    
    // ...add more criteria as needed
    
    return score;
}
  
function filterPotentialMatches(user, allMatches) {
    const filteredMatches = allMatches.filter(match => {
      const score = calculateCompatibilityScore(user, match);
      
      // Filter out matches that don't meet certain criteria
      if (score < 20 || match.distance > user.maxDistance) {
        return false;
      }
      
      return true;
    });
    
    return filteredMatches;
}
  